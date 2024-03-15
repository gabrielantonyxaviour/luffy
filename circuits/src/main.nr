use dep::std;
use dep::ecrecover;

global MERKLE_DEPTH = 8;
fn main(
    signer_pub_x_key: [u8; 32],
    signer_pub_y_key: [u8; 32],
    signature: [u8; 64], //hashed_message: [u8; 32],
    player_ids: [u64; 11],
    player_ids_salt: [u8; 32],
    player_points: [u8; 11],
    player_points_root: pub [u8; 32],
    merkle_paths: [[Field; MERKLE_DEPTH]; 11],
    squad_hash: pub [Field; 32] //nullifier: pub [u8; 32]
) -> pub u8 {
    // verify ECDSA signature

    let computedAddress: Field = ecrecover::secp256k1::PubKey::from_xy(signer_pub_x_key, signer_pub_y_key).to_eth_address(); // Compute address from public key
    let recoveredAddress = ecrecover::ecrecover(signer_pub_x_key, signer_pub_y_key, signature, hashed_message); // Ecrecover signature and verify
    assert(recoveredAddress == computedAddress); // Check recovered address is computed address

    // verify squad hash

    let computed_player_ids_hash = std::hash::keccak256(player_ids, player_ids_salt);

    // verify the merkle path of the point to confirm that is actually the points of the player

    // sum all points and return it back to the contract

    let mut totalPoints: u8= 0;

    for point in player_points {
        totalPoints+=point;
    }

    totalPoints
    //let computedAddress: Field = ecrecover::secp256k1::PubKey::from_xy(signer_pub_x_key, signer_pub_y_key).to_eth_address(); // Compute address from public key
    //let recoveredAddress = ecrecover::ecrecover(signer_pub_x_key, signer_pub_y_key, signature, hashed_message); // Ecrecover signature and verify
    //assert(recoveredAddress == computedAddress); // Check recovered address is computed address
    //let gen_nullifier = std::hash::keccak256(signature, 64); // generate nullifier
    //assert(gen_nullifier == nullifier); // Check if nullifier hash is valid
    // // Return nullifier
    // nullifier
}

fn get_hash_data(poll_id: [u8; 32], farcaster_id: [u8]) -> [u8; 32] {
    let mut combined_key: [u8; 64] = [0; 64];
    for i in 0..32 {
        combined_key[i]=poll_id[i];
    }
    for i in 0..32 {
        combined_key[i+32]=farcaster_id[i];
    }

    let hashed_message = std::hash::keccak256(combined_key, 64);
    hashed_message
}

fn u8_to_u160(array: [u8]) -> Field {
    let mut addr: Field = 0;
    for i in 0..20 {
        // only take the last 20 bytes of the hash
        addr = (addr * 256) + (array[i] as Field);
    }
    addr
}
