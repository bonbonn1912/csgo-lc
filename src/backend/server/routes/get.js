const path = require('path')
const GET_ROUTES = require('express').Router()
let GAME_STORE = require("../store.js")

GET_ROUTES.get('/api/v1/getgame', (req, res) =>{
    let key = req.query.key;
    console.log("get key : " + key)
    let players = GAME_STORE.get(key)
    console.log(players)
    res.send({players: players})
})

GET_ROUTES.get('/*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, "../../../dist", "index.html"))
})



module.exports = GET_ROUTES