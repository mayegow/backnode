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

function addData(table, data){
    console.log(data.id, "EXECUTION INSERT=================>", data)
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO ${table} SET ?`, [data], (error, result)=>{ 
            return error ? reject(error) : resolve(result)
        })
    })
}
function updateData(table, data){
    console.log(data.id, "EXECUTION UPDATE=================>")
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (error, result)=>{ 
            return error ? reject(error) : resolve(result)
        })
    })
}

function deleteData(table, id){
    console.log("ELEMENTO QUE SE ELIMINARÁ", id)
    return new Promise((resolve, reject)=>{
        connection.query(`DELETE FROM ${table} WHERE id = ? `, id, (error, result)=>{ 
            return error ? reject(error) : resolve(result)
        })
    })
}


function query(table, data){
    console.log(table, data)
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE ? `, data, (error, result)=>{ 
            return error ? reject(error) : resolve(result[0])
        })
    })
}



module.exports = {
    get,
    getOnlyOne,
    addData,
    updateData,
    deleteData,
    query
}