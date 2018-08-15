import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Dropdown, Icon, Avatar, Row, Col } from 'antd'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

import { isLogin } from '../../utils/tool'
import './index.scss'
import { className } from 'classnames';

class HomeLayout extends React.Component {
  componentDidMount () {
    if(!isLogin()){
      this.props.history.push('/login')
    }
  }
  handleUserMenu(e){
    if(e.key == 1){
      localStorage.setItem('MYTOKEN','')
      this.props.history.push('/login')
    }
  }
  userMenu () {
    return (
      <Menu
        theme="dark"
        onClick={this.handleUserMenu.bind(this)}
      >
        <Menu.Item key="0"><Icon type="user" />查看资料</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1"><Icon type="poweroff" />注销登陆</Menu.Item>
      </Menu>
    )
  }
  render () {
    const { children } = this.props
    return (
      <Layout>
        <Header className="header">
          <div className="logo">后台管理</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
            className='header-menu'
          >
            <Menu.Item key="1">管理</Menu.Item>
            <Menu.Item key="2">运营</Menu.Item>
            <Menu.Item key="3">广告</Menu.Item>
          </Menu>
          <Dropdown overlay={this.userMenu()}>
            <div className='header-avatarbox'>
            <Avatar icon="user" />
            <Icon type="caret-down" />
            </div>
          </Dropdown>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
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