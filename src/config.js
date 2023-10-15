// all global variables here
require('dotenv').config()

module.exports = {
    app: {
        port: process.env.PORT || 4000
    },
    jwt:{
        secret: process.env.JWT_TOKEN || 'NO BODY'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'example'
    }
}