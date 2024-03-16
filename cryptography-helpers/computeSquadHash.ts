import { keccak256, encodePacked } from "viem";

export default function computeSquadHash(
  playerIds: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ],
  secret: `0x${string}`
): `0x${string}` {
  const squadHash = keccak256(
    encodePacked(["uint8[11]", "bytes32"], [playerIds, secret])
  );
  return squadHash;
}
