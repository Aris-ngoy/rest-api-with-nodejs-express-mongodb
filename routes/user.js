const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/checkAuth');

//GET ALL USERS
router.get('/', checkAuth, async (req,res)=>{
    try {
        const users = await UserModel.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({message: error})
    }
});

//CREATE NEW USER
router.post('/signup',async (req,res)=>{
    try {
        const existingUser = await UserModel.find({email:req.body.email})
        if(existingUser.length !== 0){
            return res.status(409).json({message : "The User does exist ..."})
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });
       const createdUser = await user.save();
       res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({message : error})
    }
});

//UPDATE USER INFO
router.put('/:user_id',checkAuth,(req,res)=>{
    UserModel.updateMany({_id : req.params.user_id},{$set : req.body}).exec()
    .then(()=>{
        res.json(req.body)
    }).catch(err =>{
        res.json({message : err})
    })
});

//DELETE USER
router.delete('/:userID',checkAuth,async (req,res)=>{
    try {
        const deletedUser =  await UserModel.deleteOne({ _id : req.params.userID})
        res.status(200).json({
            message : 'User been deleted ...',
            data : deletedUser,
        })
    } catch (error) {
        res.status(500).json({message : error})
    }
});

router.post('/login',(req,res)=>{
    UserModel.findOne({email : req.body.email }).exec()
        .then(user =>{
                if(user){
                    verifyPassword(user,req,res)
                }else{
                    res.json({message : "Incorrect email or password..."})
                }
            }).catch(error =>{
                res.status(500).json({message : `error : ${error}` })
        })
})
//VERIFY PASSWORD
const verifyPassword = (user,req,res)=>{
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(err) return res.status(500).json({message : err})
        else{
            if(result) return getToken(user,res)
            else return res.json({message : "Authentication failed ..."})
        }
    })
}

const getToken = (user,res) =>{
    const token = jwt.sign({ email: user.email, userId : user._id,},
        process.env.JWT_KEY, { expiresIn:"1h"})
    res.json({
        message : "Auth successful",
        user,
        token : token
    });
}



module.exports = router;