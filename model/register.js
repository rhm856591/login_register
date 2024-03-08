const mongoose = require("mongoose")

const userRegister = new mongoose.Schema({
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    cpassword:{
        type: String
    }
})

const registerData = mongoose.model('registerData', userRegister)

module.exports = registerData