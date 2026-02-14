//WEB socket - A persistent connection between client & server 
// & Socket.io (Real Time Chatting)
const express = require("express");

const app = express();

const http = require("http");
const socketIO= require("socket.io");

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket=>{console.log("User Connected");

    socket.on("message", msg=>{
        io.emit("message",msg)
    });
});

server.listen(5001);
console.log("server connected");