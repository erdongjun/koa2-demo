import React from 'react'
import { Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu;

class MenuSider extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = [];

  state = {
    openKeys: [],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  handleMainMenu (e) {
    this.props.handleMainMenu(e)
  }
  render() {
    let {menuList,mainKey} = this.props
    let menuArr = []
    menuList.map(item=>{
      if(item.key === mainKey ){
        menuArr = item && item.list || []
      } 
    })
    return (
      <Menu
        mode="inline"
      >
        {menuArr.map(item=>(
          <SubMenu key={item.key} title={<span><Icon type="mail" /><span>{item.name}</span></span>}>
            {item.list.map(subitem=>(
              <Menu.Item key={subitem.key} onClick={this.handleMainMenu.bind(this)}>{subitem.name}</Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    );
  }
}

export default MenuSider
