const db = require('../../DB/mysql')
const TABLE = 'auth'
const auth = require('../../authentication')
const bcrypt = require('bcrypt')
module.exports = function(dbinject){
    let db = dbinject
    if(!db){
        db = require('../../DB/mysql')
    }

    async function login(user_name_d, password_user){
        const data = await db.query(TABLE, {user_name: user_name_d})
        console.log(data)
        console.log("PASSWORD:: >", data.password)
        return bcrypt.compare(password_user.toString(), data.password.toString())
        .then(result =>{
            if(result === true){
                return auth.tokenAssing({...data})
            } else {
                throw new Error("Not valid")
            }
        })
    }

    async function addData(data){
        const authData = {
            id: data.id
        }

        if (data.user_name){
            authData.user_name = data.user_name
        }
        if (data.password){
            authData.password = await bcrypt.hash(data.password, 5)
        }

        return db.addData(TABLE, authData)
    }
    async function updateData(data){
        const authData = {
            id: data.id
        }

        if (data.user_name){
            authData.user_name = data.user_name
        }
        if (data.password){
            authData.password = await bcrypt.hash(data.password, 5)
        }

        return db.updateData(TABLE, authData)
    }
    
    return {
        updateData,
        addData,
        login
    }
}