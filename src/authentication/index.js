const jwt = require('jsonwebtoken')
const config = require('../config')

const secret = config.jwt

function tokenAssing(data){
    return jwt.sign(data, secret) //token
}

module.exports = {
    tokenAssing
}
