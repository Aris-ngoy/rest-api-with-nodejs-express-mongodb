const mongoose = require('mongoose');

const SkillSchema = mongoose.Schema({
    name: {type : String , required : true },
    type: {type : String , required : true },
    user_id: {type : String , required : true },
})

module.exports = mongoose.model('skills',SkillSchema)