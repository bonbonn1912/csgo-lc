const SERVER = require('./server/server.js')
const CONFIG = require('../config.js')
const path = require('path')
const PORT = CONFIG.SERVER.PORT || 3000



SERVER.listen(PORT, () => console.log("Server listening on Port : " + PORT))