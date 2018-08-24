import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Badge } from 'antd'

// 组件
import HomeLayout from '../../containers/layouts/HomeLayout'
// css
import './index.scss'
// 公共函数
import { getMainMenuName, getUserInfo } from '../../utils/tool'
// stroe actin动作
import { setMenuList } from '../../store/menu/action'
// async 异步请求函数
import { asyncMenuList } from '../../store/menu/index'

class MenuList extends Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    // 更新当前菜单列表
    this.getMenuList()
  }
  async getMenuList(){
    const info = getUserInfo()
    // 获取该管理员权限的菜单列表
    let menuList = await asyncMenuList({uid:info.uid})
    localStorage.setItem('MENULIST',JSON.stringify(menuList))
    this.props.dispatch(setMenuList(menuList))
  }
  render () {
    const {menuList} = this.props
    const title = getMainMenuName(menuList && menuList.extra || [])
    console.log(menuList)
    return (
      <HomeLayout>
        <section className='page-header'>
          <h2>{title} <Badge count={25} /></h2>
          <section>
          </section>
        </section>
        <section  className='page-content'>
          <h2>首页</h2>
        </section>
      </HomeLayout>
    )
  }
}

export default withRouter(connect(({menuList}) =>({menuList}))(MenuList))