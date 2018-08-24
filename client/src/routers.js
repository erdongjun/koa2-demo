import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
// 公共pages
import Home from './pages/home'
import Common from './pages/common'
import Login from './pages/login'
import NoMatch from './pages/nomatch'
// pages
import MenuList from './pages/menu' // 菜单管理


const Root = ({store}) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        {/* 登陆页 */}
        <Route path="/Login" component={Login}/>
        {/* 运营 */}
        <Route path="/yu" component={Common}/>
        {/* 系统 */}
        <Route exact path="/System" component={Common}/>
        <Route path="/System/MenuManage/MenuList" component={MenuList}/>
        {/* 404 */}
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </Provider>
)

export default Root