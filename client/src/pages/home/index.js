import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Badge } from 'antd'

// 组件
import HomeLayout from '../../containers/layouts/HomeLayout'

// css
import './index.scss'
class Home extends Component {
  constructor (props) {
    super(props)
  }
  async componentDidMount () {
    
  }
  render () {
    const {userInfo} = this.props
    return (
      <HomeLayout>
        <section className='page-header'>
          <section>
          </section>
        </section>
        <section  className='page-content'>
          <h2 clas>欢迎使用后台管理系统</h2>
        </section>
      </HomeLayout>
    )
  }

}

export default withRouter(connect(({userInfo}) =>({userInfo}))(Home))