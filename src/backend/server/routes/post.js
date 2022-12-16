const POST_ROUTES = require('express').Router()
const AddRanksToPlayer = require('../../stats/addStats.js')
let GAME_STORE = require('../store')
const getHash = require('../../stats/hash.js')



POST_ROUTES.post('/api/v1/status', async (req, res) =>{
    let players = await AddRanksToPlayer(req.body.player)
    let key = getHash(JSON.stringify(players))
    console.log(key)
    GAME_STORE.set(key, players)
    res.send({players:players})
})


    
POST_ROUTES.post('/api/v1/consoleelo', async (req, res) =>{
    console.log(req.body.player)
    let players = await AddRanksToPlayer(req.body.player)
    let key = getHash(JSON.stringify(players))
    GAME_STORE.set(key, players)
    res.send({url: `https://csgo-lc-production.up.railway.app/room?key=${key}` })
})




module.exports = POST_ROUTES