import React from 'react';
import { connect } from 'react-redux'
import { addGUN, addGUNAsync, removeGUN } from './index.redux'
// import { addGUN, removeGUN } from './index.redux'    // 为了提高复用性，组件中尽量少依赖
class App extends React.Component{
    render(){
        return(
            <div>
                <h1>现在有机枪{this.props.num}把</h1>
                <button onClick={this.props.addGUN}>申请武器</button>
                <button onClick={this.props.addGUNAsync}>异步申请武器</button>
                <button onClick={this.props.removeGUN}>削减武器</button>
            </div>
        ) 
    }
}
const mapStatetoProps = (state) => {
    return {num:state}
}
const actionCreaters = {addGUN, addGUNAsync, removeGUN}

App = connect(mapStatetoProps, actionCreaters)(App)
export default App