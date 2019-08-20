const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const mongoose=require('mongoose');
const userRoutes = require("./routes/user");
const port = 3000;
var AYLIENTextAPI = require('aylien_textapi');

mongoose
  .connect("mongodb://localhost:27017/chat-app")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const app = express();

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var textapi = new AYLIENTextAPI({
  application_id: "e922bc04",
  application_key: "9634fa6bd72230ef96239f2d6b4a1af2"
});




app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

const server = app.listen(port, () => {
    console.log("Server started on port " + port + "...");
});

const io = socket.listen(server);
io.sockets.on('connection', (socket) => {
  socket.on('join',(data)=>{
   socket.join(data.room);
  });
  
  socket.on('message',(data)=>{ 
    var polarity;
    textapi.sentiment({
      'text': data.message
    }, function(error, response) {
      if (error === null) {
        polarity=response.polarity;
       
      }
      console.log(polarity);
      io.in(data.room).emit('new message', { message: data.message,user:data.user,polarity:polarity});

    });

    })
});
 

app.use("/api/users",userRoutes);


module.exports=app;