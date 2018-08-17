import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'

const { Content, Sider } = Layout

import MenuSider from './MenuSider'
import MenuHeader from './MenuHeader'

import { isLogin, getUserInfo } from '../../utils/tool'
import { userLogin } from '../../store/user/action'

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
  componentDidMount () {
    if(!isLogin()){
      this.props.history.push('/Login')
      return false
    }
    this.props.dispatch(userLogin(getUserInfo()))
  }
  onOpenChange (openKeys) {
    console.log(this,openKeys)
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
    console.log()
    const { children, userInfo } = this.props
    return (
      <Layout>
        <MenuHeader handleUserMenu={this.handleUserMenu.bind(this)}  userInfo={userInfo && userInfo.info}/>
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

export default withRouter(connect(({userInfo}) =>({userInfo}))(HomeLayout))