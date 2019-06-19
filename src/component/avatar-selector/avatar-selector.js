import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
    // 属性检测
    static propTypes = {
        selectAvatar: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render() {
        const avatarList = 'man,woman,boy,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        .split(',')
        .map(v=>({            
            icon: require(`../imgs/${v}.png`),            
            text: v        
        }))
        const selectAvatar = this.state.selectAvatar 
        ? (<div>
            <span>已选择头像</span>
            <img style={{width:20}} src={this.state.selectAvatar.icon} alt={`${this.state.selectAvatar}`}></img>
            </div>
            ) : '请选择头像'
        return (
            <div>
                <List renderHeader={()=>selectAvatar}>
                    <Grid 
                    data={avatarList} 
                    columnNum={5}
                    onClick={(e)=>{
                        this.setState({selectAvatar:e})
                        this.props.selectAvatar(e.text)
                    }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector