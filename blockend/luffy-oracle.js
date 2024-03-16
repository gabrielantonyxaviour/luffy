const {
  keccak256,
  encodePacked,
  encodeAbiParameters,
  parseAbiParameters,
  hexToBytes,
} = await import("npm:viem");
const gameWeek = args[0];

if (secrets.apiKey == "") {
  throw Error("PINATA_API_KEY environment variable not set for Pinata API.");
}

const weightage = {
  ALL: {
    minutesPlayed: 0.05,
    yellowCard: -2,
    redCard: -5,
    ownGoal: -5,
    fouls: -1,
    penaltyMissed: -5,
    lateGoal: 2,
    dribblesCompleted: 1,
    aerialDuelsWon: 1,
  },
  GK: {
    saves: 1,
    cleanSheet: 5,
    penaltySaved: 6,
    passingAccuracy: 0.3,
    goalsConceded: -2,
    goalsScored: 10,
    assists: 6,
  },
  DEF: {
    cleanSheet: 4,
    tackles: 2,
    interceptions: 2,
    clearances: 1,
    blocks: 2,
    passingAccuracy: 0.1,
    dribblesCompleted: 2,
    goalsScored: 6,
    assists: 4,
  },
  MID: {
    goalsScored: 4,
    assists: 2,
    tackles: 2,
    interceptions: 2,
    passingAccuracy: 0.2,
  },
  FWD: {
    goalsScored: 1,
    assists: 2,
    tackles: 1,
    interceptions: 1,
    shootingAccuracy: 0.1,
    passingAccuracy: 0.05,
    shotsOnTarget: 1,
    shots: 0.1,
  },
};

function computeMerkleRoot(points) {
  const hashedValues = points.map((point) =>
    keccak256(`0x${point.toString(16)}`)
  );

  function recursiveMerkleRoot(hashes) {
    if (hashes.length === 1) {
      return hashes[0];
    }

    const nextLevelHashes = [];

    // Combine adjacent hashes and hash them together
    for (let i = 0; i < hashes.length; i += 2) {
      const left = hashes[i];
      const right = i + 1 < hashes.length ? hashes[i + 1] : "0x";
      const combinedHash = keccak256(
        encodePacked(["bytes32", "bytes32"], [left, right])
      );
      nextLevelHashes.push(combinedHash);
    }

    // Recur for the next level
    return recursiveMerkleRoot(nextLevelHashes);
  }

  // Start the recursive computation
  return recursiveMerkleRoot(hashedValues);
}

function padArrayWithZeros(array) {
  const paddedLength = Math.pow(2, Math.ceil(Math.log2(array.length)));
  return array.concat(
    Array.from({ length: paddedLength - array.length }, () => 0)
  );
}

// In future, we will use multiple Sports APIs to get the player performance data
// and perform aggregation to generate the points of the players.
const playerPerformaceRequest = Functions.makeHttpRequest({
  url: `https://luffy-eight.vercel.app/api/scores?gameweek=${gameWeek}`,
});

// const footyStatsRequest = Functions.makeHttpRequest({
//   url: `https://footystats.com/api/scores?gameweek=${gameWeek}`,
// })

// const goalcomRequest = Functions.makeHttpRequest({
//   url: `https://goal.com/api/scores?gameweek=${gameWeek}`,
// })

// const premierLeagueRequest = Functions.makeHttpRequest({
//   url: `https://premierleague.com/api/scores?gameweek=${gameWeek}`,
// })

const [playerPerformaceResponse] = await Promise.all([playerPerformaceRequest]);

let points = [];

if (!playerPerformaceResponse.error) {
  console.log("Player performance API success");
  let playerData = playerPerformaceResponse.data.data;

  for (let i = 0; i < playerData.length; i++) {
    let player = playerData[i];
    let playerPoints = 0;

    playerPoints += Math.floor(
      parseInt(player.statistics.minutesPlayed ?? "0") *
        weightage.ALL.minutesPlayed
    );
    playerPoints +=
      parseInt(player.statistics.yellowCards ?? "0") * weightage.ALL.yellowCard;
    playerPoints +=
      parseInt(player.statistics.redCards ?? "0") * weightage.ALL.redCard;
    playerPoints +=
      parseInt(player.statistics.ownGoals ?? "0") * weightage.ALL.ownGoal;
    playerPoints +=
      parseInt(player.statistics.fouls ?? "0") * weightage.ALL.fouls;
    playerPoints +=
      parseInt(player.statistics.penaltiesMissed ?? "0") *
      weightage.ALL.penaltyMissed;
    playerPoints +=
      parseInt(player.statistics.lateGoal ?? "0") * weightage.ALL.lateGoal;
    playerPoints +=
      parseInt(player.statistics.dribblesCompleted ?? "0") *
      weightage.ALL.dribblesCompleted;
    playerPoints +=
      parseInt(player.statistics.aerialDuelsWon ?? "0") *
      weightage.ALL.aerialDuelsWon;
    if (player.position == "GK") {
      playerPoints +=
        parseInt(player.statistics.saves ?? "0") * weightage.GK.saves;
      playerPoints +=
        parseInt(player.statistics.cleanSheet ?? "0") * weightage.GK.cleanSheet;
      playerPoints +=
        parseInt(player.statistics.penaltySaved ?? "0") *
        weightage.GK.penaltySaved;
      playerPoints +=
        parseInt(player.statistics.goalsConceded ?? "0") *
        weightage.GK.goalsConceded;
      playerPoints +=
        parseInt(player.statistics.goalsScored ?? "0") *
        weightage.GK.goalsScored;
      playerPoints +=
        parseInt(player.statistics.assists ?? "0") * weightage.GK.assists;
    } else if (player.position == "DEF") {
      playerPoints +=
        parseInt(player.statistics.cleanSheet ?? "0") *
        weightage.DEF.cleanSheet;
      playerPoints +=
        parseInt(player.statistics.tackles ?? "0") * weightage.DEF.tackles;
      playerPoints +=
        parseInt(player.statistics.interceptions ?? "0") *
        weightage.DEF.interceptions;
      playerPoints +=
        parseInt(player.statistics.clearances ?? "0") *
        weightage.DEF.clearances;
      playerPoints +=
        parseInt(player.statistics.blocks ?? "0") * weightage.DEF.blocks;
      playerPoints +=
        parseInt(player.statistics.dribblesCompleted ?? "0") *
        weightage.DEF.dribblesCompleted;
      playerPoints +=
        parseInt(player.statistics.goalsScored ?? "0") *
        weightage.DEF.goalsScored;
      playerPoints +=
        parseInt(player.statistics.assists ?? "0") * weightage.DEF.assists;
    } else if (player.position == "MID") {
      playerPoints +=
        parseInt(player.statistics.goalsScored ?? "0") *
        weightage.MID.goalsScored;
      playerPoints +=
        parseInt(player.statistics.assists ?? "0") * weightage.MID.assists;
      playerPoints +=
        parseInt(player.statistics.tackles ?? "0") * weightage.MID.tackles;
      playerPoints +=
        parseInt(player.statistics.interceptions ?? "0") *
        weightage.MID.interceptions;
      playerPoints += Math.floor(
        parseInt(player.statistics.passingAccuracy ?? "0") *
          weightage.MID.passingAccuracy
      );
    } else if (player.position == "FWD") {
      playerPoints +=
        parseInt(player.statistics.goalsScored ?? "0") *
        weightage.FWD.goalsScored;
      playerPoints +=
        parseInt(player.statistics.assists ?? "0") * weightage.FWD.assists;
      playerPoints +=
        parseInt(player.statistics.tackles ?? "0") * weightage.FWD.tackles;
      playerPoints +=
        parseInt(player.statistics.interceptions ?? "0") *
        weightage.FWD.interceptions;
      playerPoints += Math.floor(
        parseInt(player.statistics.shootingAccuracy ?? "0") *
          weightage.FWD.shootingAccuracy
      );
      playerPoints += Math.floor(
        parseInt(player.statistics.passingAccuracy ?? "0") *
          weightage.FWD.passingAccuracy
      );
      playerPoints +=
        parseInt(player.statistics.shotsOnTarget ?? "0") *
        weightage.FWD.shotsOnTarget;
      playerPoints += Math.floor(
        parseInt(player.statistics.shots ?? "0") * weightage.FWD.shots
      );
    }
    points.push(playerPoints);
  }
} else {
}

console.log(points);

const pinFileToPinataRequest = Functions.makeHttpRequest({
  url: `https://api.pinata.cloud/pinning/pinJSONToIPFS`,
  method: "POST",
  headers: {
    Authorization: `Bearer ${secrets.apiKey}`,
    "Content-Type": "application/json",
  },
  data: {
    pinataMetadata: {
      name: "Gameweeek" + gameWeek,
    },
    pinataContent: {
      points: points,
    },
  },
});

const [pinFileToPinataResponse] = await Promise.all([pinFileToPinataRequest]);

console.log(pinFileToPinataResponse);
const merkleRoot = computeMerkleRoot(padArrayWithZeros(points));
console.log(merkleRoot);
const returnDataHex = encodeAbiParameters(
  parseAbiParameters("bytes32, string"),
  [merkleRoot, pinFileToPinataResponse.data.IpfsHash]
);
console.log(returnDataHex);

return hexToBytes(returnDataHex);
