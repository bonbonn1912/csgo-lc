const POST_ROUTES = require('express').Router()
const AddRanksToPlayer = require('../../stats/addStats.js')
let GAME_STORE = require('../store')
const getHash = require('../../stats/hash.js')
let sort = require('../../stats/sort.js')


POST_ROUTES.post('/api/v1/status', async (req, res) =>{
    let players = await AddRanksToPlayer(req.body.player)
    let key = getHash(JSON.stringify(players))
    players = sort(players)
    GAME_STORE.set(key, players)
    res.send({players:players})
})


    
POST_ROUTES.post('/api/v1/consoleelo', async (req, res) =>{
    let player = req.body.data.player
    let players = await AddRanksToPlayer(player)
    let key = getHash(JSON.stringify(players))
    players = sort(players)
    GAME_STORE.set(key, players)
    res.send({url: `https://csgo-lc-production.up.railway.app/room?key=${key}` })
})




module.exports = POST_ROUTES