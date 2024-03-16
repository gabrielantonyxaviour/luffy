use dep::std;
use dep::ecrecover;

global MERKLE_DEPTH = 4;
fn main(
    signer_pub_x_key: [u8; 32],
    signer_pub_y_key: [u8; 32],
    signature: [u8; 64],
    player_ids: [u8; 11],
    player_ids_salt: [u8; 32],
    player_points: [Field; 11],
    merkle_paths: [[Field; MERKLE_DEPTH]; 11],
    player_points_root: pub Field,
    squad_hash: pub [u8; 32]
) -> pub u8 {
    // verify squad hash
    let computed_player_ids_hash = std::hash::keccak256(
        concatenate_player_ids_with_salt(player_ids, player_ids_salt),
        43
    );
    assert(computed_player_ids_hash == squad_hash);

    // verify ECDSA signature
    let computedAddress: Field = ecrecover::secp256k1::PubKey::from_xy(signer_pub_x_key, signer_pub_y_key).to_eth_address(); // Compute address from public key
    let recoveredAddress = ecrecover::ecrecover(
        signer_pub_x_key,
        signer_pub_y_key,
        signature,
        computed_player_ids_hash
    );
    assert(recoveredAddress == computedAddress);

    // verify the merkle path of the point to confirm that is actually the points of the player
    for i in 0..11 {
        let computed_root= std::merkle::compute_merkle_root(player_points[i], i, merkle_paths[i]);
        assert(computed_root == player_points_root);
    }

    // sum all points and return it back to the contract
    let mut totalPoints: u8= 0;
    for point in player_points {
        totalPoints+=point as u8;
    }
    totalPoints
}

fn concatenate_player_ids_with_salt(player_ids: [u8; 11], player_ids_salt: [u8; 32]) -> [u8; 43] {
    let mut combined_array: [u8; 43] = [0; 43];
    for i in 0..11 {
        combined_array[i]=player_ids[i];
    }
    for i in 0..32 {
        combined_array[i+11]=player_ids_salt[i];
    }
    combined_array
}
