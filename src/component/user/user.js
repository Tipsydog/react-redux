
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'

@connect(
    state => state.user,
    {logoutSubmit}
)

class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        const alert = Modal.alert
        alert('注销', '确认退出登录???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookies.erase('userid')
                // window.location.href = window.location.href // 强制刷新页面，简单粗暴，清除不了redux
                this.props.logoutSubmit()   // 用于清除redux数据
            } },
          ])
    }
    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief

        return props.user ? (
            <div>
                <Result
                    img={<img src={require(`../imgs/${this.props.avatar}.png`)} alt='' style={{ width: 50 }} />}
                    title={this.props.user}
                    message={props.type === 'boss' ? props.company : null}
                />
                <List
                    renderHeader={() => '简介'}
                >
                    <Item
                        multipleLine
                        wrap
                    >
                        {props.title}{props.title}{props.title}{props.title}
                        {/* {console.log(this.props.decs)} */}
                        {this.props.decs.split('/n').map(v => (<Brief key={v}>{v}</Brief>))}
                        {props.money ? <Brief>{props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>

                <Button onClick={this.logout} >退出登录</Button>

            </div>
        ) :  <Redirect to={this.props.redirectTo} /> 
        

    }
}

export default User