import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WhiteSpace, Radio, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'
import './register.css'

@connect(
    state=>state.user,
    {register}
)
@imoocForm
class Register extends React.Component{
    constructor(props){
        super(props)
        // this.state = {
        //     user:'',
        //     pwd:'',
        //     repeatpwd:'',
        //     type:''
        // }    // 使用高阶组件imooc-form代替1
        this.handleRegister = this.handleRegister.bind(this)
    }
    // handleChange(key, value){
    //     this.setState({
    //         [key]:value
    //     })  // key加中括号才能改变user的值，否则改变的是key的值
    //     // console.log(this.props)
    // }    // 使用高阶组件imooc-form代替2
    handleRegister(){
        this.props.register(this.props.state)
    }
    render(){
        // console.log(this)
        const RadioItem = Radio.RadioItem
        return(
            <div>
                {/* 注册后跳转 */}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <InputItem
                        onChange={v=>{this.props.handleChange('user', v)}}>用户</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem
                        type='password'
                        onChange={v=>{this.props.handleChange('pwd', v)}}>密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem
                        type='password'
                        onChange={v=>{this.props.handleChange('repeatpwd', v)}}>确认密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <RadioItem 
                        checked={this.props.state.type==='genius'}
                        onChange={()=>this.props.handleChange('type', 'genius')}
                        >牛人</RadioItem>
                    <RadioItem 
                        checked={this.props.state.type==='boss'}
                        onChange={()=>this.props.handleChange('type', 'boss')}
                        >Boss</RadioItem>
                    <Button onClick={this.handleRegister} type='primary'>注册</Button>
                </List>
            </div>           
        )
    }
}

export default Register