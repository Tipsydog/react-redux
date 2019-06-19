import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux'
import {connect} from 'react-redux'

@connect(
    null,
    {loadData}
)

class AuthRouter extends React.Component{
    componentDidMount(){
        const publicList = ['/login', '/register'];
        const pathName = this.props.location.pathname   // 没和Router绑定的组件想使用this.props就要引用withRouter
        // console.log(this.props)
        if (publicList.indexOf(pathName)>-1){
            return null;
        }
        axios.get('/user/info').then(res=>{
            if (res.status === 200){
                // console.log(res.data)
                if (res.data.code === 0){
                    // 登录信息
                    this.props.loadData(res.data.data)
                }else{
                    this.props.history.push('/login')    
                }
            }
        })
    }
    render(){
        return (
            null
            // <p>判断跳转的地方</p>
        )
    }
}

export default withRouter(AuthRouter)