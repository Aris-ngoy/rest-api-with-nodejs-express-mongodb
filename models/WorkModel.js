const mongoose = require('mongoose');

const WorkSchema = mongoose.Schema({
    name:{type:String,required:true},
    about:{type:String,required:true},
    color:{type:String,required:true},
    web:{type:String,required:true},
    android:{type:String,required:true},
    ios:{type:String,required:true},
    graphic:{type:String,required:true},
    user_id:{type:String,required:true},
    icon:String,
    website:String,
    company:{type:String,required : true }
})

module.exports = mongoose.model('works',WorkSchema)