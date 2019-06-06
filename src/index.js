import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';
import { counter, addGUN, removeGUN, addGUNAsync } from './index.redux';

const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));
console.log(10)
function render(){
    ReactDom.render(
        <Provider store={store}>
            <App />
        </Provider>,   
    document.getElementById('root'));
}
render()

store.subscribe(render) // 使用subscribe订阅render
// import {createStore} from 'redux';



// const store = createStore(counter)

// const init = store.getState()
// console.log(init)