import React from 'react';
import { List, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/logo';
import { login } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
	state => state.user,
	{ login }
)
@imoocForm

class Login extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		//     user: '',
		//     pwd: ''
		// }        // 使用高阶组件imooc-form代替1
		this.register = this.register.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}
	register() {
		// 和<Route>绑定的组件都可用this.props.history.push('地址')跳转
		this.props.history.push('./register')
	}
	// handleChange(key, value) {
	//     this.setState({
	//         [key]: value
	//     })  // key加中括号才能改变user的值，否则改变的是key的值
	//     // console.log(this.props)
	// }    // 使用高阶组件imooc-form代替2，还有下方修改的属性都从this.state改为this.props.state
	handleLogin() {
		this.props.login(this.props.state)
	}
	render() {
		return (
			<div>
				{this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo></Logo>
				<h2>登录页面</h2>
				<WingBlank>
					<List>
						{this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
						<InputItem
							onChange={v => { this.props.handleChange('user', v) }}
						>用户</InputItem>
						<WhiteSpace></WhiteSpace>
						<InputItem
							onChange={v => { this.props.handleChange('pwd', v) }}
							type='password'
						>密码</InputItem>
						<WhiteSpace></WhiteSpace>
					</List>
					<Button onClick={this.handleLogin} type='primary'>登录</Button>
					<WhiteSpace></WhiteSpace>
					<Button onClick={this.register} type='primary'>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login