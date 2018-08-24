import React from 'react'
import { Menu, Icon,Layout,Dropdown, Avatar } from 'antd'
const { Header } = Layout


const SubMenu = Menu.SubMenu;

class MenuHeader extends React.Component {
  constructor (props) {
    super(props)
  }
  handleUserMenu (e) {
    this.props.handleUserMenu(e)
  }
  handleMainMenu (e) {
    this.props.handleMainMenu(e)
  }
  userMenu () {
    return (
      <Menu
        theme="dark"
        onClick={this.handleUserMenu.bind(this)}
      >
        <Menu.Item key="0"><Icon type="user" />{this.props.userInfo && this.props.userInfo.username}</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1"><Icon type="poweroff" />注销登陆</Menu.Item>
      </Menu>
    )
  }
  render() {
    let {menuList,mainKey} = this.props
    return (
      <Header className="header">
          <div className="logo">后台管理</div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[mainKey]}
            style={{ lineHeight: '64px' }}
            className='header-menu'
            onClick={this.handleMainMenu.bind(this)}
          >
          {menuList.map(item => (
            <Menu.Item key={item.key}>{item.name}</Menu.Item>
          ))}
          </Menu>
          <Dropdown overlay={this.userMenu()}>
            <div className='header-avatarbox'>
              <Avatar icon="user"></Avatar>
            <Icon type="caret-down" />
            </div>
          </Dropdown>
        </Header>
    );
  }
}

export default MenuHeader
