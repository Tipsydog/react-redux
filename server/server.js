const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model');
const Chat = model.getModel('chat')
const app = express()

// work with express，io与express关联
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function(socket){
	// console.log('user login')
	socket.on('sendmsg',function(data){
		const {from, to, msg} = data
		const chatid = [from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msg},function(err,doc){
			// console.log(Object.assign({},doc._doc))
			io.emit('recvmsg', Object.assign({},doc._doc))
		})
		// console.log(data)
		// io.emit('recvmsg',data)
	})
})

const userRouter = require('./user/user');


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)	// 后端路由
// app.listen(9093,function(){
// 	console.log('Node app start at port 9093')
// })	// 没有socket的时候用app.listen
server.listen(9093,function(){
	console.log('Node app start at port 9093')
})