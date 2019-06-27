
import React from 'react';
import {List,Badge} from 'antd-mobile'
import {connect} from 'react-redux';

@connect(
  state=>state
)
class Msg extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
      // console.log(this.props) 
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userInfo = this.props.chat.users
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const aLast = this.getLast(a).create_time
      const bLast = this.getLast(b).create_time
      return bLast - aLast
    })
    console.log(chatList.map(v=>{return v}))

    return (

      <div>
        
          {chatList.map(v=>{
            const lastItem = this.getLast(v)
            const targetId = userid === v[0].from ? v[0].to : v[0].from
            const unReadNum = v.filter(v=>!v.read && v.to===userid).length
            return(
              <List key={lastItem._id}>
                <Item
                  extra={<Badge text={unReadNum}></Badge>}
                  thumb={require(`../imgs/${userInfo[targetId].avatar}.png`)}
                  arrow="horizontal"
                  onClick={()=>{
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                >
                  {lastItem.content}
                  <Brief>{userInfo[targetId].name}</Brief>
                </Item>
              </List>   
            )
          })}
        
      </div>
    )
  }
}
export default Msg