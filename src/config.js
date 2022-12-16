const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const CONFIG = {
  SERVER: {
    PORT: process.env.PORT,
  },
  FACEIT: {
    API_KEY: process.env.FACEIT_API_KEY,
  },
  PUPPETEER: {
    RUNTIME: process.env.RUNTIME,
    DOCKER:{
        headless: true,
        args: ["--no-sandbox"],
        executablePath: "/usr/bin/chromium-browser",
    }
  },
};

module.exports = CONFIG;
