const express = require('express');
const router = express.Router();
const PostModel = require('../models/Post');

router.get('/',async(req,res)=>{
    try {
       const posts = await PostModel.find()
       res.json(posts);
    } catch (error){
        res.json({message : error})
    }
})

router.post('/',async (req,res)=>{
    try {
        let post = new PostModel({ title: req.body.title });
        let data = await post.save()
        res.json(data)
    } catch (error) {
        res.json({message : error})
    }
});

module.exports = router;