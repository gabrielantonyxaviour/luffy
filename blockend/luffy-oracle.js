const gameWeek = args[0];

const weightage = {
  GK: {
    saves: 1,
    cleanSheet: 4,
    penaltySaved: 6,
    goalsConceded: -2,
    goalsScored,
  },
};
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

const points = [];

if (!playerPerformaceResponse.error) {
  console.log("Player performance API success");
  const playerData = playerPerformaceResponse.data.data;

  for (let i = 0; i < playerData.length; i++) {
    const player = playerData[i];

    if (player.position == "GK") {
    } else if (player.position == "DEF") {
    } else if (player.position == "MID") {
    } else if (player.position == "FWD") {
    }
  }
} else {
  console.log("Player performance API failed");
}

// The source code MUST return a Buffer or the request will return an error message
// Use one of the following functions to convert to a Buffer representing the response bytes that are returned to the consumer smart contract:
// - Functions.encodeUint256
// - Functions.encodeInt256
// - Functions.encodeString
// Or return a custom Buffer for a custom byte encoding
return Functions.encodeString("Success");
