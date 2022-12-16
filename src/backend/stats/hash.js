const crypto = require('crypto')

function getHash(str, algo = "SHA-256") {
    const hash = crypto.createHash('sha256').update(str).digest('hex');
    return hash
  }

module.exports = getHash