import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Badge } from 'antd'

// 组件
import HomeLayout from '../../containers/layouts/HomeLayout'
// 公共函数
import { getUserInfo } from '../../utils/tool'
// css
import './index.scss'
// stroe actin动作
import { userLogin } from '../../store/user/action'
import { setMenuList } from '../../store/menu/action'

// async 异步请求函数
import { asyncMenuList } from '../../store/menu/index'



import './index.scss'
class Home extends Component {
  constructor (props) {
    super(props)
  }
  async componentDidMount () {
    console.log('首页')
    let info = getUserInfo()
    // 设置redux全局用户信息
    this.props.dispatch(userLogin(info))
    // 获取该管理员权限的菜单列表
    let res = await asyncMenuList({uid:info.uid})
    // 设置该管理员权限的菜单列表
    this.props.dispatch(setMenuList(res))
  }
  render () {
    const {userInfo} = this.props
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