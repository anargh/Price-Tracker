const jwt = require('jsonwebtoken');
const config = require('../config')

const SECRET = config.tokenSecret;

class TokenService {
  constructor() { }

  generateJwtToken(user) {
    return jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' });
  }

  verifyToken(token) {
    return jwt.verify(token, SECRET);
  }
}

module.exports = TokenService;