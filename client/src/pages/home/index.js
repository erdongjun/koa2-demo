import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Badge } from 'antd'


import { Utilfetch } from '../../utils/fetch'
import { isLogin } from '../../utils/tool'


import HomeLayout from '../../containers/layouts/HomeLayout'
import {userLogin,userSignout} from '../../store/user/action'



import './index.scss'
class Home extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {userInfo} = this.props
    console.log(userInfo)
    return (
      <HomeLayout>
        <section className='page-header'>
          <h2>首页</h2>
          <section>
          </section>
        </section>
        <section  className='page-content'>
          欢迎登陆后台管理
        </section>
      </HomeLayout>
    )
  }

}

export default withRouter(connect(({userInfo}) =>({userInfo}))(Home))