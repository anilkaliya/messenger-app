const express=require('express');
const Router=express.Router();
const Chat=require('../models/chat');

Router.get("/:chatroom",(req,res,next)=>{
    Chat.find({chatroom:req.params.chatroom}).then(chats=>{
        res.status(200).json(chats);
    })
})

module.exports=Router; 