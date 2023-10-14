//Create to constructor

const db = require('../../DB/mysql')
const ctrl = require('./controler')

module.exports = ctrl(db) 