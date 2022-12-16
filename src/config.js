const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const CONFIG = {
    SERVER : {
        PORT: process.env.PORT
    },
    FACEIT: {
        API_KEY: process.env.FACEIT_API_KEY
    }
}



module.exports = CONFIG