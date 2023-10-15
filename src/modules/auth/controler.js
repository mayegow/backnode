const database = require('../../DB/mysql')
const auth = require('../../authentication/index')

const TABLE = 'auth'
const bcrypt = require('bcrypt')


module.exports = function(dbinject){

    let db = dbinject

    if(!db){
        db = database
    }

    async function login(user_name, password){
        const data = await db.query(TABLE, {user_name:  user_name})

        return bcrypt.compare(password, data.password)
        .then(result =>{
            if (result){
                //token generate
                return auth.tokenAssing(...data)
            } else {
                throw new Error('Not valid')
            }
        })
    }
    
    async function updateData(body){
        const authData = {
            id: body.id
        }

        if(body.user_name){
            authData.user_name = body.user_name
        }
        
        if(body.password){
            authData.password = await bcrypt.hash(body.password.toString(), 5)
        }

        return db.updateData(TABLE, authData)
    }
    
    
    return {
        login,
        updateData,
    }
}