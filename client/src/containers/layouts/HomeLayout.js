/*
 * @Author: chenweizhi 
 * @Date: 2018-08-17 20:30:15 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-08-17 21:00:39
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
// stroe actin对象
import { userLogin } from '../../store/user/action'
import { setMenuList } from '../../store/menu/action'
// async 异步请求函数
import { asyncMenuList } from '../../store/menu/index'



class HomeLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openKeys: ['sub1'],
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      userInfo: {},
    }
  }
  async componentDidMount () {
    if(!isLogin()){
      this.props.history.push('/Login')
      return false
    }
    let info = getUserInfo()
    // 设置redux全局用户信息
    this.props.dispatch(userLogin(info))
    // 获取该用户有权限的菜单列表
    let result = await asyncMenuList({uid:info.uid})
    console.log(result)

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
    if(e.key == 1){
      localStorage.setItem('MYTOKEN','')
      localStorage.setItem('USERINFO','')
      this.props.history.push('/Login')
    }
  }
  render () {
    const { children, userInfo } = this.props
    return (
      <Layout>
        <MenuHeader handleUserMenu={this.handleUserMenu.bind(this)}  userInfo={userInfo}/>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <MenuSider/>
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