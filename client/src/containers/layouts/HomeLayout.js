/*
 * @Author: chenweizhi 
 * @Date: 2018-08-17 20:30:15 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-08-23 23:01:12
 */

// core 核心组件
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'
const { Content, Sider } = Layout
// UI组件
import MenuSider from './MenuSider'
import MenuHeader from './MenuHeader'
// 公共函数
import { isLogin, getUserInfo } from '../../utils/tool'
// css
import './index.scss'

// stroe actin动作
import { userLogin } from '../../store/user/action'
import { setMenuList } from '../../store/menu/action'

// async 异步请求函数
import { asyncMenuList } from '../../store/menu/index'




class HomeLayout extends React.Component {
  constructor (props) {
    super(props)
  }
  async componentDidMount () {
    if(!isLogin()){
      this.props.history.push('/Login')
      return false
    }
    // 登陆状态
    let info = getUserInfo()
    // 设置redux全局用户信息
    this.props.dispatch(userLogin(info))
    // 如果没有菜单信息重新请求数据
    let menuList = localStorage.getItem('MENULIST')
    if (!menuList){
      // 获取该管理员权限的菜单列表
      menuList = await asyncMenuList({uid:info.uid})
      localStorage.setItem('MENULIST',JSON.stringify(menuList))
      this.props.dispatch(setMenuList(menuList))
    } else {
      // 设置该管理员权限的菜单列表
      this.props.dispatch(setMenuList(JSON.parse(menuList)))
    }
  }
  onOpenChange (openKeys) {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  handleUserMenu(e){
    // 用户账户操作
    if(e.key == 1){
      localStorage.setItem('MYTOKEN','')
      localStorage.setItem('USERINFO','')
      this.props.history.push('/Login')
    }
  }
  handleMainMenu(e){
    // 一级菜单操作
    const {menuList} = this.props
    let menuArr = menuList && menuList.extra || []
    menuArr.forEach(item => {
      if(e.key == item.key){
        this.props.history.push(item.key)
      }
    });
  }
  render () {
    const { children, userInfo, menuList} = this.props
    let menuArr = menuList && menuList.data || []
    let mainKey = '/System'
    let hash = location.hash
    menuArr.map(item => {
      if(hash.includes(item.key)){
        mainKey = item.key
      }
    })
    return (
      <Layout>
        <MenuHeader handleUserMenu={this.handleUserMenu.bind(this)} handleMainMenu={this.handleMainMenu.bind(this)}  userInfo={userInfo} menuList={menuArr} mainKey={mainKey}/>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <MenuSider handleMainMenu={this.handleMainMenu.bind(this)} menuList={menuArr} mainKey={mainKey}/>
          </Sider>
          <Layout>
            <Content  className='content-wrap'>
            <Row>
              <Col span={1}></Col>
              <Col span={22}>{children}</Col>
              <Col span={1}></Col>
            </Row>
            </Content>
            <div className='content-footer'>@2018</div>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(connect(({userInfo,menuList}) =>({userInfo,menuList}))(HomeLayout))