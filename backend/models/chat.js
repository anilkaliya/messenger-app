const mongoose = require("mongoose");
// const uniqueValidator=require("mongoose-unique-validator");
var messageSchema = mongoose.Schema({ name: String ,
message:String});
const chatSchema = mongoose.Schema({
messages:[ messageSchema],
chatroom: { type: String },
date: { type: Date, default: Date.now },
});

// userSchema.plugin(uniqueValidator,{ message: 'Error, expected {PATH} to be unique.' });
module.exports = mongoose.model("Chat", chatSchema);