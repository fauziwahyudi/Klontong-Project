var jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY

const signToken = (data) => {
    return jwt.sign(data, secret)
}

const verifyToken = (token) => {
    return jwt.verify(token, secret)
}

module.exports = {
    signToken,
    verifyToken
}