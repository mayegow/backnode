const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../middleware/errors')
const secret = config.jwt.secret

function tokenAssing(data){
    return jwt.sign(data, secret) //token
}

function tokenVerify(token){
    return jwt.verify(token, secret)
}

const checkToken = {
    confirmToken: function(req, id){
        const decode = decodeHeader(req)
        console.log(decode.id, "========", id)
        if(decode.id !== id){
            throw error('Can´t this options', 401)
        }
    }

}

function getToken(auth){
    console.log(auth, "===== here carnal")
    if(!auth){
        throw error('no token', 401)
    } 

    if(auth.indexOf('Bearer') === -1){
        throw error('Not valid format', 401)
    }

    let token = auth.replace('Bearer ', '')
    return token
}

function decodeHeader(req){
    const auth = req.headers.authorization || ''
    const token = getToken(auth)
    const decoded = tokenVerify(token)

    req.user = decoded

    return decoded

}

module.exports = {
    tokenAssing,
    checkToken
}
