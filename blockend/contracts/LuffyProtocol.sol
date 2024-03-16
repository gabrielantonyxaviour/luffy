pragma solidity ^0.8.10;

import "./worldcoin/interface/IWorldcoinVerifier.sol";

error NotOwner(address caller);
error InvalidGameweek(uint256 gameweek);
error SelectSquadDisabled(uint256 gameweek);
error WorldCoinVerificationFailed(address signal, uint256 root, uint256 nullifierHash, uint256[8] proof);


contract LuffyProtocol {

    address public owner;
    address public worldcoinVerifier;
    mapping(uint256=>mapping(uint256=>bytes32)) public gameWeekToSquadHash;
    mapping(uint256=>mapping(uint256=>uint256)) public playerPoints;
    mapping(address=>uint256) public addressToNullifier;
    mapping(uint256=>address[])public nulliferToAddresses;
    uint256 public gameweekCounter;
    string[] public playersMetadata;
    bool public isSelectSquadEnabled;
    bool public worldcoinVerificationEnabled;

    constructor(address _worldcoinVerifier, string[] memory _playersMetadata)
    {
        worldcoinVerifier = _worldcoinVerifier;
        isSelectSquadEnabled = true;
        gameweekCounter = 1;
        playersMetadata = _playersMetadata;
        emit PlayersMetadataUpdated(playersMetadata.length, _playersMetadata);
    }

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event PlayersMetadataUpdated(uint256 playersMetadataLength, string[] playersMetadata);
    event SquadRegistered(uint256 gameweek, address signal, uint256 nullifierHash, bytes32 squadHash);

    modifier onlyOwner {
        if(msg.sender != owner) revert NotOwner(msg.sender);
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
        try IWorldcoinVerifier(worldcoinVerifier).verifyAndExecute(_wrldProof.signal, _wrldProof.root, _wrldProof.nullifierHash, _wrldProof.proof)
        {
            return true;
        } catch {
            return false;
        }
      
    }





    
}

// register squad for a game (upload merkle root) 

// upload points by using chainlink functions and chainlink automations

// verify zk proof and update points to the user on chain