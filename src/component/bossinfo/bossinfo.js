import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect(
    state => state.user,
    { update }
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'title': '',
            'decs': '',
            'company': '',
            'money': ''
        }
        this.selectAvatar = this.selectAvatar.bind(this)
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    selectAvatar(e) {
        this.setState({
            'avatar': e
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        // console.log(this.props)
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                {console.log(this.props)}
                <NavBar mode="dark">BOSS完善信息页面</NavBar>
                <AvatarSelector
                    selectAvatar={this.selectAvatar}
                ></AvatarSelector>
                <InputItem
                    onChange={(v) => { this.onChange('title', v) }}
                >招聘职位</InputItem>
                <InputItem
                    onChange={(v) => { this.onChange('company', v) }}
                >公司名称 </InputItem>
                <InputItem
                    onChange={(v) => { this.onChange('money', v) }}
                >职位薪资</InputItem>
                <TextareaItem
                    onChange={(v) => { this.onChange('decs', v) }}
                    title='职位描述 '
                    rows={3}
                ></TextareaItem>
                <Button
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                    type='primary'>保存</Button>
            </div>
        )
    }
}

export default BossInfo