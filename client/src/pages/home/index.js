import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Utilfetch } from '../../utils/fetch'
import { isLogin } from '../../utils/tool'


import HomeLayout from '../../containers/layouts/HomeLayout'
import {userLogin,userSignout} from '../../store/user/action'

import './index.scss'
class Home extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    // this.props.dispatch(userSignout())
    // console.log(Utilfetch)
    // Utilfetch.get('/api/userinfo/1',{name:1})
    // Utilfetch.post()
  }
  componentDidMount () {
    // if(!isLogin()){
    //   this.props.history.push('/login')
    // }
  }
  render () {
    const {userInfo} = this.props
    return (
      <HomeLayout>
        <p onClick={this.handleClick}>用户列表</p>
        <br/>
        <p to="/user/add">{userInfo.name}</p>
      </HomeLayout>
    )
  }

}

export default withRouter(connect(({userInfo}) =>({userInfo}))(Home))