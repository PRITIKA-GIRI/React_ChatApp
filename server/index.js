const express=require ('express');
const http=require('http');
const app=express();
const {Server}=require ('socket.io');

const cors=require('cors');
const server=http.createServer(app);
app.use(cors());
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
    }
})
const port=3001;

io.on("connection",(socket)=>{
    console.log(`User connected:${socket.id}`)

    socket.on("join_room",(data)=>{
        socket.join(data);
    })
    socket.on("sent_message",(data)=>{
       socket.to(data.room).emit("receive_message",data);
    })
})

server.listen(port ,()=>{
    console.log(`Server running on port ${port}`);
})