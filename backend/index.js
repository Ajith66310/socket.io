import express from 'express'
import 'dotenv/config.js'
import cors from 'cors'
import {createServer} from 'http'
import { Server, Socket } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"]
  }
})



io.on('connection',(socket)=>{
  console.log(`connection established` );
  
  socket.on('message',(message)=>{
      console.log(message);
      socket.emit('message',message);  
  })

  socket.on('disconnect',()=>{
    console.log('disconnected');
  })

})

const port = process.env.PORT;

server.listen(port,()=>{
  console.log(`Server running: http://localhost:${port} `);
})