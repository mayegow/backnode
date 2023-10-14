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
    if(data  && data.id == 0){
        return insert(table, data)
    } else {
        return update(table, data)
    }
}

function deleteData(table, data){
    return new Promise((resolve, reject)=>{
        connection.query(`DELETE FROM ${table} WHERE id = ? `, data.id, (error, result)=>{ 
            return error ? reject(error) : resolve(result)
        })
    })
}

function insert(table, data){
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, result)=>{ 
            return error ? reject(error) : resolve(result)
        })
    })
}
function update(table, data){
    return new Promise((resolve, reject)=>{
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error, result)=>{ 
            return error ? reject(error) : resolve(result)
        })
    })
}

module.exports = {
    get,
    getOnlyOne,
    updateData,
    deleteData
}