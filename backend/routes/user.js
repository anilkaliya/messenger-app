const express=require('express');
const Router=express.Router();
const User=require('../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

Router.post("/login",(req,res,next)=>{
    let fetchedUser;
   User.findOne({name:req.body.name}).then(user=>{
    if(!user){
        console.log("this fails");
       return res.status(404).json({message:"Authentication failed"});
    }
    fetchedUser=user;
    return bcrypt.compare(req.body.password,user.password);
    }).then(result=>{
       if(!result)
       return res.status(404).json({message:"failed"});
       else{
            const token=jwt.sign
            ({name:fetchedUser.name},
             "the_secret",
             {expiresIn:"1h"});
            res.status(200).
            json({token:token,
            expiresIn:3600,
           name:fetchedUser.name })
       }
   });
   });  

Router.post("/signup",(req,res,next)=>{
    bcrypt.hash(req.body.password,10).then((hash)=>{
        const user=new User
        ({name:req.body.name,
         password:hash});
         user.save().then(data=>{
             console.log("signup done");
             return res.status(201).json({message:"done"});
            }).catch(err=>{
             return res.status(201).json({message:err});
         })
    })
})


Router.get("",(req,res,next)=>{
    User.find({},{name:1}).then(users=>{
        res.status(200).json(users);
    })
})

module.exports=Router; 