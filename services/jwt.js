const jwt = require('jwt-simple');
const config = require('../config');
const secret = config.jwtInfo.secret;

exports.createToken = userID => jwt.encode({ userID }, secret);

exports.readToken = token => jwt.decode(token, secret);
