import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import App from './App';
import counter from './index.redux';

const store = createStore(counter);
console.log(1)
function render(){
    ReactDom.render(<App store={store}/>, document.getElementById('root'));
}
render()

store.subscribe(render)
// import {createStore} from 'redux';



// const store = createStore(counter)

// const init = store.getState()
// console.log(init)