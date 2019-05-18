const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title : String,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('posts', PostSchema);

