const CONFIG = require("../../config");
const STEAM = require("steamidconvert")();
const PUPPETEER = require("puppeteer");
const CREATE_URL = require('./helper.js')
const numberToRank = require('./helper.js');

const getElo = async (steam64Id) => {
  const endpoint = `https://open.faceit.com/data/v4/players?game=csgo&game_player_id=${steam64Id}`;
  try {
    response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${CONFIG.FACEIT.API_KEY}`,
      },
    });
    if(response.status == 200){
        response = await response.json();
        playerData = {
            elo: response.games.csgo.faceit_elo,
            avatar: response.avatar == "" ? "https://i.imgur.com/goxT1jr.png" : response.avatar,
            faceit_url: `https://www.faceit.com/en/players/${response.nickname}`
        }
        return playerData
    }else{
        return {
            elo: "No Faceit Found",
            avatar: "https://i.imgur.com/goxT1jr.png",
            faceit_url: `https://imgur.com/a/80XF00Z`
        };
    }
  } catch (err) {
    console.log(err);
    return {
        elo: "No Faceit Found",
        avatar: "https://i.imgur.com/goxT1jr.png",
        faceit_url: `https://imgur.com/a/80XF00Z`
    };
  }
};

const AddRanksToPlayer = async (players) => {
  players = getSteam64Id(players);
  /** Get Faceit elo for all Players */
  await Promise.all(
    players.map(async (singlePlayer) => {
      let playerData = await getElo(singlePlayer.steam64);
      singlePlayer["faceit_elo"] = playerData.elo;
      singlePlayer["avatar"] = playerData.avatar;
      singlePlayer["faceit_url"] = playerData.faceit_url;
    })
  );

  /** Create csgo-stats-url */
  let steamIDs = players.map(singlePlayer => singlePlayer.id)
  const URL = CREATE_URL(steamIDs)
  let ranks = await getMMRank(URL)
  if(players.length == ranks.length){
    for(let i = 0; i < players.length; i++){
        players[i]["mm_rank"] = ranks[i]
    }
  }
  return players
};

const getSteam64Id = (playerObjects) => {
  playerObjects.forEach((player) => {
    let steam64Id = STEAM.convertTo64(player.id);
    player["steam64"] = steam64Id;
  });
  return playerObjects;
};

const getMMRank = async (url) => {
  const regex = /\d+/g;
  const puppeteer_config = CONFIG.PUPPETEER.RUNTIME == undefined ? {} : CONFIG.PUPPETEER.DOCKER 
  const browser = await PUPPETEER.launch(puppeteer_config);
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  await page.goto(url);
  const images = await page.$$eval("img", (anchors) =>
    [].map.call(anchors, (img) => img.src)
  );
  const imagesWithOutAvg = images.filter((url ) => url.includes("rank"))
  let ranks = []
  for(let i = 2; i < imagesWithOutAvg.length; i++){
        let rank = imagesWithOutAvg[i]
        ranks.push(rank)
  }
  await browser.close();
  return ranks
};
module.exports = AddRanksToPlayer;
