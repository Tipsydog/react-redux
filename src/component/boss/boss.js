import React from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import { getUserList } from '../../redux/chatuser.redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

@withRouter
@connect(
    state=>state.chatuser,
    {getUserList}
)

class Boss extends React.Component{
   
    componentDidMount(){
        this.props.getUserList('genius')
    }
    handleClick(v){
        console.log('press printcard')
        this.props.history.push(`/chat/${v._id}`)
    }
    
    render(){

        return( 
            <div>
                <WingBlank>
                    <WhiteSpace></WhiteSpace>
                    {this.props.userlist.map(v=>(
                         v.avatar ? (
                        <div key={v._id} >
                            <Card 
                                key={v._id}
                                onClick={()=>this.handleClick(v)}
                                > 
                                <Card.Header 
                                title={v.user}
                                thumb={require(`../imgs/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}></Card.Header>
                                <Card.Body>
                                    {v.decs.split('/n').map(d=>(
                                        <div key={d}>{d}</div> //  多一层遍历的目的是为了能识别换行符
                                    ))}
                                </Card.Body>
                            </Card>
                            <WhiteSpace></WhiteSpace>
                        </div>
                        ) : null
                    ))}
                    
                </WingBlank>
            </div>
            
        )
    }
}

export default Boss