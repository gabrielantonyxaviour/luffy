// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.10;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


error NotAllowedCaller(
        address caller,
        address automationRegistry,
        address owner
    );
error UnexpectedRequestID(bytes32 requestId);


contract TestChainlink is FunctionsClient, ConfirmedOwner {
    using Strings for uint256;
    using FunctionsRequest for FunctionsRequest.Request;  


    // Chainlink Variables
    bytes32 public donId;
    address public functionsRouter;
    address public upkeepContract;
    bytes public request;
    string public sourceCode;
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    uint32 public s_callbackGasLimit=300000;
    uint64 public s_subscriptionId;
    address public i_link;

    constructor(bytes32 _donId, address _functionsRouter, address _link, string memory _sourceCode, uint32 _subscriptionId)
        FunctionsClient(_functionsRouter) ConfirmedOwner(msg.sender) 
    {
        sourceCode=_sourceCode;
        functionsRouter=_functionsRouter;
        donId=_donId;
        i_link=_link;
        s_subscriptionId=_subscriptionId;
    }

    event OracleReturned(bytes32 indexed requestId, bytes response, bytes err);

    modifier onlyAllowed() {
        if (msg.sender != owner() && msg.sender != upkeepContract)
            revert NotAllowedCaller(msg.sender, owner(), upkeepContract);
        _;
    }

    function setAutomationCronContract(
        address _upkeepContract
    ) external onlyOwner {
        upkeepContract = _upkeepContract;
    }


    function updateRequest(
        bytes memory _request,
        uint64 _subscriptionId,
        uint32 _gasLimit,
        bytes32 _donID
    ) external onlyOwner {
        request = _request;
        s_subscriptionId = _subscriptionId;
        s_callbackGasLimit = _gasLimit;
        donId = _donID;
    }

    function sendRequestCBOR()
        external
        onlyAllowed
        returns (bytes32 requestId)
    {
        s_lastRequestId = _sendRequest(
            request,
            s_subscriptionId,
            s_callbackGasLimit,
            donId
        );
        return s_lastRequestId;
    }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        s_lastResponse = response;
        s_lastError = err;
        emit OracleReturned(requestId, response, err);
    } 

}