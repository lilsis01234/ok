const crypto = require('crypto')
const fs = require('fs');


//Generation d'un clé secrete
const generateRandomKey = () => {
    return crypto.randomBytes(32).toString('hex');
}

const auth_config = () => {
    const accessTokenSecret = generateRandomKey();
    const refreshTokenSecret = generateRandomKey();
  
    const envData = `ACCESS_TOKEN_SECRET=${accessTokenSecret}\nREFRESH_TOKEN_SECRET=${refreshTokenSecret}`;
    fs.writeFileSync('.env', envData);
  };
  
  module.exports = auth_config;
