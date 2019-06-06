import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import App from './App';
import { counter, addGUN, removeGUN} from './index.redux';

const store = createStore(counter);
console.log(10)
function render(){
    ReactDom.render(<App store={store} addGUN={addGUN} removeGUN={removeGUN}/>, document.getElementById('root'));
}
render()

store.subscribe(render)
// import {createStore} from 'redux';



// const store = createStore(counter)

// const init = store.getState()
// console.log(init)