// 幼儿园级的高阶组件实现handlechange方法
import React from 'react';

export default function imoocForm (Comp){
    return class WarpperComp extends React.Component{
        constructor(props){
            super(props)
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }
        handleChange(key, value){
            console.log(key,value)
            this.setState({
                [key]:value
            })  // key加中括号才能改变user的值，否则改变的是key的值
            // console.log(this.props)
        }
        render(){
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}> </Comp>
        }
    }
}