const jwt = require('jsonwebtoken')
const config = require('../config')

const secret = config.jwt.secret

function tokenAssing(data){
    return jwt.sign(data, secret) //token
}

module.exports = {
    tokenAssing
}
