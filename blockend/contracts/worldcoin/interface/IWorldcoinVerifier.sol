//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IWorldcoinVerifier {
/// @param signal An arbitrary input from the user that cannot be tampered with. In this case, it is the user's wallet address.
/// @param root The root (returned by the IDKit widget).
/// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the IDKit widget).
/// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the IDKit widget).
function verifyAndExecute(
    address signal,
    uint256 root,
    uint256 nullifierHash,
    uint256[8] calldata proof
) external;
}