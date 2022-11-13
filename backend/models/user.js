const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const user = new mongoose.model("users",registerSchema)

module.exports = user;