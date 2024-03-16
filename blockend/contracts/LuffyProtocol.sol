// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./worldcoin/interface/IWorldcoinVerifier.sol";
import "./interface/hyperlane/IMailbox.sol";

import {UltraVerifier} from "./noir/plonk_vk.sol";

error NotOwner(address caller);
error NotMailbox(address caller);
error InvalidGameweek(uint256 gameweek);
error SelectSquadDisabled(uint256 gameweek);
error WorldCoinVerificationFailed(address signal, uint256 root, uint256 nullifierHash, uint256[8] proof);
error InadequateCrosschainFee(uint32 destinationDomain, uint256 requiredFee, uint256 sentFee);
error ZeroKnowledgeVerificationFailed();

contract LuffyProtocol {

    address public owner;
    IWorldcoinVerifier public worldcoinVerifier;
    IMailbox public mailbox;
    mapping(uint256=>mapping(uint256=>bytes32)) public gameWeekToSquadHash;
    mapping(uint256=>mapping(uint256=>uint256)) public playerPoints;
    mapping(address=>uint256) public addressToNullifier;
    mapping(uint256=>address[])public nulliferToAddresses;
    mapping(uint256=>bytes32) public pointsMerkleRoot;
    uint256 public gameweekCounter;
    string[] public playersMetadata;
    bool public isSelectSquadEnabled;
    bool public worldcoinVerificationEnabled;

    UltraVerifier public zkVerifier; 

    constructor(IMailbox _mailbox, IWorldcoinVerifier _worldcoinVerifier, string[] memory _playersMetadata)
    {
        mailbox = _mailbox;
        worldcoinVerifier = _worldcoinVerifier;
        isSelectSquadEnabled = true;
        gameweekCounter = 1;
        playersMetadata = _playersMetadata;
        owner=msg.sender;
        zkVerifier=new UltraVerifier();
        emit PlayersMetadataUpdated(playersMetadata.length, _playersMetadata);
    }

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event PlayersMetadataUpdated(uint256 playersMetadataLength, string[] playersMetadata);
    event SquadRegistered(uint256 gameweek, address signal, uint256 nullifierHash, bytes32 squadHash);

    modifier onlyOwner {
        if(msg.sender != owner) revert NotOwner(msg.sender);
        _;
    }

    modifier onlyMailbox() {
        if(msg.sender != address(mailbox)) revert NotMailbox(msg.sender);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        address oldOwner = owner;
        owner = _newOwner;
        emit OwnershipTransferred(oldOwner, _newOwner);
    }

    function setWorldcoinVerification(bool _worldcoinVerification) public onlyOwner {
        worldcoinVerificationEnabled = _worldcoinVerification;
    }



    function registerMorePlayers(string[] memory _playersMetadata) public onlyOwner {
        for(uint256 i=0; i<_playersMetadata.length; i++) playersMetadata.push(_playersMetadata[i]);
        emit PlayersMetadataUpdated(playersMetadata.length, _playersMetadata);
    }


    function registerSquad(uint256 _gameWeek, bytes32 _squadHash, WorldcoinProofInput memory _wrldProof) public {
        if(!isSelectSquadEnabled) revert SelectSquadDisabled(_gameWeek);
        if(_gameWeek != gameweekCounter) revert InvalidGameweek(_gameWeek);
        if(worldcoinVerificationEnabled){
            if(!verifyWorldcoin(_wrldProof)) revert WorldCoinVerificationFailed(_wrldProof.signal, _wrldProof.root, _wrldProof.nullifierHash, _wrldProof.proof);
        }
        if(addressToNullifier[_wrldProof.signal] == 0){
            addressToNullifier[_wrldProof.signal] = _wrldProof.nullifierHash;
            nulliferToAddresses[_wrldProof.nullifierHash].push(_wrldProof.signal);
        }
        gameWeekToSquadHash[_gameWeek][_wrldProof.nullifierHash] = _squadHash;
        emit SquadRegistered(_gameWeek, _wrldProof.signal, _wrldProof.nullifierHash, _squadHash);
    }

    function verifyWorldcoin(WorldcoinProofInput memory _wrldProof) public returns(bool) {
        try worldcoinVerifier.verifyAndExecute(_wrldProof.signal, _wrldProof.root, _wrldProof.nullifierHash, _wrldProof.proof)
        {
            return true;
        } catch {
            return false;
        }
    }


    // Noir playground
    event ProofVerificationSuccess();
    function testNoir(uint256 _nullifierHash, bytes calldata _proof) public{
        bytes32[] memory _publicInputs=new bytes32[](2);
        _publicInputs[0]=gameWeekToSquadHash[gameweekCounter][_nullifierHash];
        _publicInputs[1]=pointsMerkleRoot[gameweekCounter];
        try zkVerifier.verify(_proof, _publicInputs)
        {
            emit ProofVerificationSuccess();
        }catch{
            revert ZeroKnowledgeVerificationFailed();
        }
    }

    // // Hyperlane Playground
    // event SentPing(bytes32 indexed messageId, uint32 indexed destinationChain, address indexed destinationAddress, uint256 fee, bytes message);
    // event ReceivedPong(bytes32 indexed messageId, uint32 indexed originChain, address indexed senderAddress, string message); 
    // function pingHyperlane(uint32 destinationDomain, bytes32 recepientAddress, string memory message) public payable{

    //     uint256 _requiredFee = mailbox.quoteDispatch(destinationDomain, recepientAddress, bytes(message));
    //     if(msg.value < _requiredFee) revert InadequateCrosschainFee(destinationDomain, _requiredFee, msg.value);

    //     bytes32 messageId = mailbox.dispatch{value: msg.value}(destinationDomain,recepientAddress, abi.encode(message));
    //     emit SentPing(messageId, destinationDomain, bytes32ToAddress(recepientAddress), msg.value, abi.encode(message));
    // }

    // function handle(uint32 _origin,bytes32 _sender,bytes calldata _message) external payable onlyMailbox{
    //     _pongHyperlane(_origin, _sender, bytes32(0), _message);
    // }

    // function _pongHyperlane(uint32 originDomain, bytes32 senderAddress, bytes32 messageId, bytes memory message) internal{
    //     emit ReceivedPong(messageId, originDomain, bytes32ToAddress(senderAddress), abi.decode(message, (string)));
    // }

    // function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
    //     return address(uint160(uint256(_buf)));
    // }

    // function getQuote(uint32 destinationDomain, bytes32 recepientAddress, string memory message) public view returns(uint256){
    //     return mailbox.quoteDispatch(destinationDomain, recepientAddress, bytes(message));
    // }
    

    // Testing helpers

    function setSelectSquadEnabled(bool _isSelectSquadEnabled) public onlyOwner {
        isSelectSquadEnabled = _isSelectSquadEnabled;
    }

    function setGameweekCounter(uint256 _gameweekCounter) public onlyOwner {
        gameweekCounter = _gameweekCounter;
    }

    function setPointsMerkleRoot(uint256 _gameweek, bytes32 _pointsMerkleRoot) public onlyOwner {
        pointsMerkleRoot[_gameweek] = _pointsMerkleRoot;
    }
    
}

// register squad for a game (upload merkle root) 

// upload points by using chainlink functions and chainlink automations

// verify zk proof and update points to the user on chain