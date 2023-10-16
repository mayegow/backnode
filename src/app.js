const express = require('express')
const morgan = require('morgan')
const config = require('./config')

const app = express()

const clients = require('./modules/clients/clientsRoutes')
const users = require('./modules/users/usersRoutes')
const auth = require('./modules/auth/authRoutes')
const error = require('./red/error_response')

//Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// configurate port
app.set('port', config.app.port)

// routes

app.use('/api/clients', clients)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use(error)

module.exports = app