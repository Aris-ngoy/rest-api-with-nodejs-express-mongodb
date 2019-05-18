const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name : { type:String , required : true },
    email: { type:String , 
        required : true, 
        match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    password : { type:String , required : true },
    created: { type: Date, default: Date.now },
    header_text:String,
    header_subtext:String,
    profile_text:String,
    profile_about:String,
    profile_picture:{
        type:String,
        required : true
    },
    address:String,
    phone:String,
    occupation:String
})

module.exports = mongoose.model('users', UserSchema);

