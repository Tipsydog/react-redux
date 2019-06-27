
import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标记已读
const MSG_READ = 'MSG_READ'

const initState = {
	chatmsg: [],
	users: {},
	unread: 0,
}

export function chat(state = initState, action) {
	switch (action.type) {
		case MSG_LIST:
			return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length }
		case MSG_RECV:
			const { payload: { to },  userid  } = action
			const n = to === userid ? 1 : 0
			// const n = action.payload.to==action.userid?1:0
			const chatmsg = [
				...state.chatmsg,
				Object.keys(action.payload.msg).reduce((ret, cur) => {
					return {
						...ret,
						[cur]: action.payload.msg[cur]
					}
				}, {})
			]

			return { ...state, chatmsg, unread: state.unread + n }
			// console.log(state.chatmsg)
			// return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
		case MSG_READ:
			const {from, num} = action.payload
			return { ...state, chatmsg:state.chatmsg.map(v=>({...v, read:v.from===from? true:v.read})), unread:state.unread-action.payload.num}
		default:
			return state
	}
}

function msgList(msgs, users, userid) {
	return { 'type': MSG_LIST, payload: { msgs, users, userid } }
}
function msgRecv(msg, userid) {
	return { 'type': MSG_RECV, payload: { msg }, userid }
}
function msgRead(from, userid, num){
	return { 'type': MSG_READ, payload: { from, userid, num}}
}

export function readMsg(from){
	return (dispatch, getState) =>{
		axios.post('/user/readmsg', {from})
		.then(res=>{
			const userid = getState().user._id	// 取redux里存储的用户登录的信息
			if (res.status===200 && res.data.code===0){
				dispatch(msgRead({userid, from, num: res.data.num}))
			}
		})
	}
}
export function recvMsg() {
	return (dispatch, getState) => {
		socket.on('recvmsg', function (data) {
			// console.log('recvmsg', data)
			const userid = getState().user._id
			// console.log(data ,userid)
			dispatch(msgRecv(data, userid))
		})
	}
}

export function sendMsg({ from, to, msg }) {
	return dispatch => {
		socket.emit('sendmsg', { from, to, msg })

	}
}

export function getMsgList() {
	// getState可以获取应用中所有状态
	return (dispatch, getState) => {
		axios.get('/user/getmsglist')
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					// console.log(getState())
					const userid = getState().user._id
					dispatch(msgList(res.data.msgs, res.data.users, userid))
				}
			})
	}
}