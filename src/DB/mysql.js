const mysql = require('mysql')
const config = require('../config')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection 

function mysqlConnect(){
    connection = mysql.createConnection(dbconfig)
    connection.connect((err) => {
        if(err){
            console.log('[db err]', err)
            setTimeout(mysqlConnect, 200)
        } else {
            console.log('database success connect')
        }
    })
    connection.on('error', err => {
        console.log('[db err]', err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            mysqlConnect()
        } else {
            throw err
        }
    })
}

mysqlConnect()

function get(table){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table}`, (error, result)=>{
            return error ? reject(error) : resolve(result)
        })
    })
}

function getOnlyOne(table, id){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, result)=>{ 
            return error ? reject(error) : resolve(result)
        })
    })
}

function updateData(table, data){

}

function deleteData(tabla, id){

}

module.exports = {
    get,
    getOnlyOne,
    updateData,
    deleteData
}