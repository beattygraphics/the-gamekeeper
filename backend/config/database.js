const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URI_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(con => {
        console.log(`MongoDB Database connected with the HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase
