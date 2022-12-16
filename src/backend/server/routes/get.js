const path = require('path')
const GET_ROUTES = require('express').Router()



GET_ROUTES.get('/*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, "../../../dist", "index.html"))
})



module.exports = GET_ROUTES