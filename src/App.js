import React from 'react';
// import { addGUN, removeGUN } from './index.redux'    // 为了提高复用性，组件中尽量少依赖
class App extends React.Component{
    render(){
        const store = this.props.store;
        const addGUN = this.props.addGUN;
        const removeGUN = this.props.removeGUN;     // 为了提高组建的复用性，addGUN方法以参数的形式传进来
        const num = store.getState();
        return(
            <div>
                <h1>现在有机枪{num}把</h1>
                <button onClick={()=>store.dispatch(addGUN())}>申请武器</button>
                <button onClick={()=>store.dispatch(removeGUN())}>削减武器</button>
            </div>
        ) 
    }
}

export default App