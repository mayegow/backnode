const express = require('express')
const morgan = require('morgan')
const config = require('./config')

const app = express()

const clients = require('./modules/clients/clientsRoutes')

//Middleware
app.use(morgan('dev'))

// configurate port
app.set('port', config.app.port)

// routes

app.use('/api/clients', clients)

module.exports = app