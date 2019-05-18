const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const SkillModel = require('../models/SkillModel');

//GET SKILLS
router.get('/:id',async (req,res)=>{
    try {
        const skills = await SkillModel.find({user_id : req.params.id})
        res.json(skills)
    } catch (error) {
        res.status(409).json(error)
    }
})

//ADD NEW SKILL
router.post('/',checkAuth,async (req,res)=>{
    try {
        const addSkill = new SkillModel(req.body)
        const skill = await addSkill.save()
        res.json(skill)
    } catch (error) {
        res.status(409).json(error)
    }
})
//UPDATE SKILL
router.put('/:id',(req,res)=>{
    SkillModel.updateMany({_id : req.params.id},{$set : req.body})
    .then(()=>{
        res.status(200).json("Skill updated ....")
    }).catch(err =>{
        res.status(409).json(err)
    })
})
//DELETE SKILL
router.delete('/:id',async(req,res)=>{
    try {
        const skill =  await SkillModel.deleteOne({ _id : req.params.id})
        res.status(200).json({
            message : 'skill has been deleted ...',
            data : skill,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;