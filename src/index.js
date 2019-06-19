import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom'

import reducers from './reducer'
import './config'
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRouter from './component/authrouter/authrouter';
import BossInfo from './component/bossinfo/bossinfo';
import GeniusInfo from './component/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'

import './index.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))	// redux检查器

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRouter></AuthRouter>
				<Switch>
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/geniusinfo' component={GeniusInfo}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
					{/* 没有路径的页面统一返回到，不添加path的组 件中 */}
					<Route component={Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
