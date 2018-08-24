import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Badge } from 'antd'

// 公共函数
import {getMainMenuName} from '../../utils/tool'
// 组件
import HomeLayout from '../../containers/layouts/HomeLayout'

// css
import './index.scss'
class Common extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {menuList} = this.props
    const title = getMainMenuName(menuList && menuList.extra || [])
    return (
      <HomeLayout>
        <section  className='page-content'>
          <h2 className='welcome-test'>欢迎使用{title}功能</h2>
        </section>
      </HomeLayout>
    )
  }
}
export default withRouter(connect(({menuList}) =>({menuList}))(Common))
