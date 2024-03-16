# Luffy

100% permissionless and private fantasy football for Euro 2024 using zk proofs.

## Problem Statement

n the sports betting industry, pervasive issues of transparency and data privacy compromise user trust and the integrity of competition. Platforms like Fantasy Premier League store user squads in a centralized manner, making them vulnerable to breaches and manipulative practices. Such breaches can lead to the unauthorized disclosure of personal data or retroactive alterations to squad compositions, distorting competition dynamics and eroding user confidence.

The solution lies in empowering users with greater transparency and data privacy protections. Through the adoption of web3 technologies and zero-knowledge proofs, we aim to create a sports betting ecosystem where trust is restored, user privacy is safeguarded, and competition is conducted with integrity. This approach will enable every participant to engage in sports betting confidently, knowing that their data is secure and competition is fair.

## Technical Description

The core logic of the project lies on Arbitrum where zk proof verification and oracles work. Thanks to low gas fees and super-fast transactions, Chiliz and Apecoin act as the monetization layer for users to place bets and earn rewards. Chainlink Functions are used to fetch reliable sports APIs to retrieve the statistics of the players and compute the points earned by the users with an algorithm hosted on-chain. This algorithm determines the points of the players for the gameweek and also returns the Merkle root of all the points, which is stored on-chain. Chainlink Time-Based Automation is used to trigger this function at the end of the gameweek. A cross-chain bridge between Arbitrum Sepolia and Chiliz Spicy Testnet is established with the help of Hyperlane deployments. Hyperlane cross-chain relayers are used to mint the rewards on Chiliz after the zk proof is verified on-chain. The Zero-knowledge circuits are built using Aztec/Noir, through which the proof generation and verification algorithm are obtained. Worldcoin acts as the Sybil-resistant layer to prevent users from creating multiple squads and farming rewards. Our UI is designed with the Nouns and Pixelated theme to give a gamified effect. Users can seamlessly onboard the application using Account Abstraction with Google Auth through the help of Dynamic wallet.

## User Story

Users create a lineup of their favorite football players on the platform and upload the hash of the player IDs on-chain without revealing these players. Along with the squad, the user needs to provide a Worldcoin proof which, once verified, acts as the identity of the user in the smart contract. Once the gameweek ends, the player performances are fetched and published on-chain via Oracles. The user can then generate a zk proof and pass it on-chain to prove the ownership of the squad and obtain the total points as an output of the zk proof verification algorithm. This verifiable data is publicly revealed on-chain. Rewards can be claimed in Chiliz/Apecoin. The verified data is bridged cross-chain to mint the rewards determined by the amount of bet and the points won.
