// SPDX:License-Identifier: MIT

pragma solidity ^0.8.0;


import { ByteHasher } from './ByteHasher.sol';
import {IWorldID} from "./IWorldID.sol";

contract WorldcoinVerifier{

/// @dev This allows us to use our hashToField function on bytes
using ByteHasher for bytes;

/// @notice Thrown when attempting to reuse a nullifier
error InvalidNullifier();

/// @dev The address of the World ID Router contract that will be used for verifying proofs
IWorldID internal immutable worldId;

/// @dev The keccak256 hash of the externalNullifier (unique identifier of the action performed), combination of appId and action
uint256 internal immutable externalNullifierHash;

/// @dev The World ID group ID (1 for Orb-verified)
uint256 internal immutable groupId = 1;

/// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
mapping(uint256 => bool) internal nullifierHashes;

/// @param _worldId The address of the WorldIDRouter that will verify the proofs
/// @param _appId The World ID App ID (from Developer Portal)
/// @param _actionId The World ID Action (from Developer Portal)
constructor(
    IWorldID _worldId,
    string memory _appId,
    string memory _actionId
) {
    worldId = _worldId;
    externalNullifierHash = abi
        .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
        .hashToField();
}

event WorldCoinSuccess(address signal);

/// @param signal An arbitrary input from the user that cannot be tampered with. In this case, it is the user's wallet address.
/// @param root The root (returned by the IDKit widget).
/// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the IDKit widget).
/// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the IDKit widget).
function verifyAndExecute(
    address signal,
    uint256 root,
    uint256 nullifierHash,
    uint256[8] calldata proof
) public {
    // First, we make sure this person hasn't done this before
    if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

    // We now verify the provided proof is valid and the user is verified by World ID
    worldId.verifyProof(
        root,
        groupId, // set to "1" in the constructor
        abi.encodePacked(signal).hashToField(),
        nullifierHash,
        externalNullifierHash,
        proof
    );

    // We now record the user has done this, so they can't do it again (sybil-resistance)
    nullifierHashes[nullifierHash] = true;

    // Finally, execute your logic here, knowing the user is verified

    emit WorldCoinSuccess(signal);
}

}