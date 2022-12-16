const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')



const POST_ROUTER = require('./routes/post.js')
const GET_ROUTER = require('./routes/get.js')


const SERVER = express()

SERVER.use(express.static(path.join(__dirname + '../../../dist')));
SERVER.use(express.json());
SERVER.use(cors());
SERVER.use(bodyParser.urlencoded({ extended: true }));
SERVER.use("/", POST_ROUTER)
SERVER.use("/", GET_ROUTER)





module.exports = SERVER