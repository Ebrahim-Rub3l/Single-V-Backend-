const mongoose = require ('mongoose')
const mongodbConnection = () => {
    return mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('DB Connect')
    })
}

module.exports = mongodbConnection