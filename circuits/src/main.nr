use dep::std;
use dep::ecrecover;

global MERKLE_DEPTH = 4;
fn main(
    signer_pub_x_key: [u8; 32],
    signer_pub_y_key: [u8; 32],
    signature: [u8; 64],
    player_ids: [u8; 11],
    player_ids_secret: [u8; 32],
    player_points: [u8; 11],
    points_merkle_paths: [[[u8; 32]; MERKLE_DEPTH]; 11],
    player_points_root: pub [u8; 32],
    squad_hash: pub [u8; 32]
) -> pub u8 {
    // verify squad hash
    let computed_player_ids_hash = std::hash::keccak256(
        concatenate_player_ids_with_salt(player_ids, player_ids_secret),
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
    for i in player_ids {
        let computed_root= compute_merkle_root(player_points[i], player_ids[i], points_merkle_paths[i]);
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

fn u8_to_u160(array: [u8]) -> Field {
    let mut conv: Field = 0;
    conv = (conv * 256) + (array[0] as Field);
    conv
}

fn compute_merkle_root(leaf: u8, leaf_index: u8, proof: [[u8; 32]; MERKLE_DEPTH]) -> [u8; 32] {
    let mut computed_hash: [u8; 32] = [0; 32];
    computed_hash[0]=leaf;
    for i in 0..MERKLE_DEPTH {
        if leaf_index % 2 == 0 {
            computed_hash = std::hash::keccak256(concatenate_leafs(computed_hash, proof[i]), 64);
        } else {
            computed_hash = std::hash::keccak256(concatenate_leafs(proof[i], computed_hash), 64);
        }
    }
    computed_hash
}

fn concatenate_leafs(leaf1: [u8; 32], leaf2: [u8; 32]) -> [u8; 64] {
    let mut arr: [u8; 64] = [0; 64];
    for i in 0..32 {
        arr[i] = leaf1[i];
        arr[i + 32] = leaf2[i];
    }
    arr
}
