import React from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware,compose } from 'redux'
import 'babel-polyfill'

import rootReducer from './store'
import Root from './routers.js'

// base.css
import './containers/base/index.scss'

const loggerMiddleware = createLogger()
const store = createStore(
    rootReducer,{},
    compose(
        applyMiddleware(
            thunkMiddleware, // 允许我们 dispatch() 函数
            loggerMiddleware, // 一个很便捷的 middleware，用来打印 action 日志
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

render(
    <Root store={store}/>,
    document.getElementById('root'))
