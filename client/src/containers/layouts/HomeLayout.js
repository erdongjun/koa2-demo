/*
 * @Author: chenweizhi 
 * @Date: 2018-08-17 20:30:15 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-08-20 22:52:32
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
import { isLogin } from '../../utils/tool'
// css
import './index.scss'



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
    let menus = menuList && menuList.data || []
    menus.forEach(item => {
      if(e.key == item.id){
        this.props.history.push(item.key)
      }
    });
  }
  render () {
    const { children, userInfo, menuList} = this.props
    console.log(menuList)
    return (
      <Layout>
        <MenuHeader handleUserMenu={this.handleUserMenu.bind(this)} handleMainMenu={this.handleMainMenu.bind(this)}  userInfo={userInfo} menuList={menuList && menuList.data || []}/>
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