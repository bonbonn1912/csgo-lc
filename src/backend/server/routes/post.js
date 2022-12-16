const POST_ROUTES = require('express').Router()
const AddRanksToPlayer = require('../../stats/addStats.js')



POST_ROUTES.post('/api/v1/status', async (req, res) =>{
    let players = await AddRanksToPlayer(req.body.player)
    res.send({players:players})
})



module.exports = POST_ROUTES