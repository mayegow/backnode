//
const app = require('./app')



app.listen(app.get('port'), () => {
    console.log("servidor ecuchando en el puerto: ", app.get('port'))
})