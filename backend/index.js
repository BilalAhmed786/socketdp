require('./db/db')
require('dotenv').config()
const express = require('express')

const cors = require('cors')
const route = require('./routes/user')
const User = require('./model/user')
const app = express()
const {Server} = require('socket.io')
const {createServer} = require('http')

app.use(express.json())
app.use(cors())
app.use('/',route)

const server = createServer(app)

const io = new Server(server,{

    cors:{
        origin:'*',
        methods:["GET","POST","PUT","DELETE"],
        Credential:true

    }


})

server.listen(process.env.PORT,()=>{

    console.log('server running on port 4000')
})

io.on('connection',async(socket)=>{

//const fetchuser data 

    const alluser = await User.find({})

    socket.emit('alluser',alluser)



    // console.log(socket.id)
socket.on('userid',async(data)=>{


    const user = await User.findById(data)

    socket.emit('singleuser',user)

    

    
})




})