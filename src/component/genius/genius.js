import React from 'react';
// import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import { getUserList } from '../../redux/chatuser.redux'
import {connect} from 'react-redux'
import PrintCard from '../printcard/printcard'

@connect(
    state=>state.chatuser,
    {getUserList}
)

class Boss extends React.Component{
   
    componentDidMount(){
        this.props.getUserList('boss')
    }
    
    render(){

        return( 
            // 新建PringtCard组件，将列表输出组件化，这里功能同boss.js
            <PrintCard userlist={this.props.userlist}></PrintCard>
        )
    }
}

export default Boss