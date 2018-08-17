import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import Home from './pages/home'
import Login from './pages/login'
import NoMatch from './pages/nomatch'


const Root = ({store}) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Login" component={Login}/>
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </Provider>
)

export default Root