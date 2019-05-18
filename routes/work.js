const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const WorkModel = require('../models/WorkModel');

//GET ALL WORK
router.get('/:id',async(req,res)=>{
    try { 
        //res.json(req.params.id);
        const works = await WorkModel.find({'user_id':req.params.id});
        res.json(works)
    } catch (error) {
        res.status(409).json(error)
    }
})

//GET SINGLE WORK
router.get('/single/:id',async(req,res)=>{
    try { 
        //res.json(req.params.id);
        const works = await WorkModel.findOne({'_id':req.params.id})
        res.json(works)
    } catch (error) {
        res.status(409).json(error)
    }
})

//ADD NEW WORK
router.post('/',checkAuth, async (req,res)=>{
    try {
        const existingWork = await WorkModel.find({email:req.body.name})
        if(existingWork.length !== 0){
            return res.status(409).json({message : "Work does exist ..."})
        }
        const work = new WorkModel(req.body)
        const newWork = await work.save()
        res.json(newWork);
    } catch (error) {
        res.status(409).json(error)
    }
})

//UPDATE WORK
router.put('/:id',checkAuth,(req,res)=>{
    WorkModel.updateMany({ _id : req.params.id },{$set : req.body })
    .then(()=>{
        res.json("Work has been updated ...")
    }).catch(err =>{
        res.json(err)
    })
})

//DELETE WORK
router.delete('/:id',checkAuth,async (req,res)=>{
    try {
        const work =  await WorkModel.deleteOne({ _id : req.params.id})
        res.status(200).json({
            message : 'Work has been deleted ...',
            data : work,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router