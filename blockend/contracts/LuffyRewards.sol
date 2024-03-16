// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./worldcoin/interface/IWorldcoinVerifier.sol";
import "./interface/hyperlane/IMailbox.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error NotOwner(address caller);
error NotMailbox(address caller);
error InvalidGameweek(uint256 gameweek);
error InvalidTokenAmount(uint256 _amount);
error TokenNotApproved(uint256 _amount);
error InadequateCrosschainFee(uint32 destinationDomain, uint256 requiredFee, uint256 sentFee);


contract LuffyRewards {

    address public owner;
    IMailbox public mailbox;
    bytes32 public immutable REWARD_TOKEN;
    IERC20 public immutable REWARD_TOKEN_ADDRESS;
    mapping(address=>uint256) public playerToBetAmounts;
    mapping(address=>uint256) public playerToRewardAmounts;
    uint256 public gameWeekCounter;
    

    constructor(IMailbox _mailbox, bytes32 _rewardToken, IERC20 _rewardTokenAddress)
    {
        mailbox = _mailbox;
        REWARD_TOKEN = _rewardToken;
        REWARD_TOKEN_ADDRESS = _rewardTokenAddress;
        gameWeekCounter=0;
        owner=msg.sender;
    }

    event BetPlaced(uint256 indexed gameWeek, address indexed player, uint256 tokenAmount);
    event RewardsClaimed(uint256 indexed gameWeek, address indexed player, uint256 tokenAmount);

    modifier onlyOwner {
        if(msg.sender != owner) revert NotOwner(msg.sender);
        _;
    }

    modifier onlyMailbox() {
        if(msg.sender != address(mailbox)) revert NotMailbox(msg.sender);
        _;
    }

    function betAmount(uint256 _gameWeek, uint256 _amount) public {
        if(_amount > 0) revert InvalidTokenAmount(_amount);
        if(_gameWeek!=gameWeekCounter+1) revert InvalidGameweek(_gameWeek);
        if(address(REWARD_TOKEN_ADDRESS) != address(0))
        {
            if(REWARD_TOKEN_ADDRESS.allowance(msg.sender, address(this)) < _amount) revert TokenNotApproved(_amount);   
            REWARD_TOKEN_ADDRESS.transferFrom(msg.sender, address(this), _amount);
        } else{
            payable(address(this)).transfer(_amount);
        }
        playerToBetAmounts[msg.sender] += _amount;
        
        emit BetPlaced(_gameWeek, msg.sender, _amount);
    }

    function _claimRewards(uint256 _gameWeek, uint256 _amount, address receiver) internal returns(bool)
    {
        if(_gameWeek>gameWeekCounter) gameWeekCounter = _gameWeek; 
        playerToRewardAmounts[receiver] += _amount;
        if(address(REWARD_TOKEN_ADDRESS) != address(0))
        {
            REWARD_TOKEN_ADDRESS.transfer(receiver, _amount);
        } else{
            payable(receiver).transfer(_amount);
        }
        emit RewardsClaimed(_gameWeek, receiver, _amount);
        return true;
    }
    


    event SentPing(bytes32 indexed messageId, uint32 indexed destinationChain, address indexed destinationAddress, uint256 fee, bytes message);
    event ReceivedPong(bytes32 indexed messageId, uint32 indexed originChain, address indexed senderAddress, string message); 
    function pingHyperlane(uint32 destinationDomain, bytes32 recepientAddress, string memory message) public payable{

        uint256 _requiredFee = mailbox.quoteDispatch(destinationDomain, recepientAddress, bytes(message));
        if(msg.value < _requiredFee) revert InadequateCrosschainFee(destinationDomain, _requiredFee, msg.value);

        bytes32 messageId = mailbox.dispatch{value: msg.value}(destinationDomain,recepientAddress,bytes("Hello, world"));
        emit SentPing(messageId, destinationDomain, bytes32ToAddress(recepientAddress), msg.value, bytes(message));
    }

    function handle(uint32 _origin,bytes32 _sender,bytes calldata _message) external payable onlyMailbox{
        _pongHyperlane(_origin, _sender, bytes32(0), _message);
    }

    function _pongHyperlane(uint32 originDomain, bytes32 senderAddress, bytes32 messageId, bytes memory message) internal{
        emit ReceivedPong(messageId, originDomain, bytes32ToAddress(senderAddress), abi.decode(message, (string)));
    }

    function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
        return address(uint160(uint256(_buf)));
    }


}

// pays some CHILIZ to take part in the betting



// if funded, the contract will pay out the winner from cross chain transaction