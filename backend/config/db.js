const mongoose = require('mongoose')

async function db() {
    try {
        let conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to ${conn.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = db