import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Input, Select, Button, Badge, Table } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

// 组件
import HomeLayout from "../../containers/layouts/HomeLayout";
// css
import "./index.scss";
// 公共函数
import { getMainMenuName, getUserInfo } from "../../utils/tool";
// stroe actin动作
import { setMenuList } from "../../store/menu/action";
// async 异步请求函数
import { asyncMenuList } from "../../store/menu/index";

class MenuListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false
    }
  }
  componentDidMount() {
    // 更新当前菜单列表
    this.getMenuList();
  }
  async getMenuList() {
    const info = getUserInfo();
    // 获取该管理员权限的菜单列表
    this.setState({
      isLoading:true
    })
    let menuList = await asyncMenuList({ uid: info.uid });
    localStorage.setItem("MENULIST", JSON.stringify(menuList));
    this.props.dispatch(setMenuList(menuList));
    this.setState({
      isLoading:false
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { menuList } = this.props;
    const { isLoading } = this.state;
    const menuArr = (menuList && menuList.extra) || [];
    const menuSortArr = (menuList && menuList.data) || [];
    const title = getMainMenuName(menuArr);
    const { getFieldDecorator } = this.props.form;
    console.log(menuList);
    return (
      <HomeLayout>
        <section className="page-header">
          <h2>
            {title} <Badge count={menuArr.length} />
          </h2>
          <section>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem>
              <Input
                  type="text"
                  style={{ width: '65%', marginRight: '3%' }}
                />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </FormItem>
            </Form>
          </section>
        </section>
        <section className="page-content">
          <Table columns={columns} loading={isLoading} dataSource={menuSortArr} />
        </section>
      </HomeLayout>
    );
  }
}

const MenuList = Form.create()(MenuListForm);

export default withRouter(connect(({ menuList }) => ({ menuList }))(MenuList));

const columns = [{
  title: '名称',
  dataIndex: 'name',
  width:'50%',
  align:'left'
}, {
  title: '链接地址',
  dataIndex: 'key',
  align:'center'
},{
  title: '操作',
  key: 'action',
  render: () => (
    <div>
      <Button type="primary">添加</Button>
      <br/>
      <br/>
      <Button type="primary">删除</Button>
    </div>
  ),
  width:'20%',
  align:'center'
}];

const data = [{
  id: 1,
  name: 'John Brown sr.',
  age: 60,
  address: 'New York No. 1 Lake Park',
  children: [{
    key: 11,
    name: 'John Brown',
    age: 42,
    address: 'New York No. 2 Lake Park',
  }, {
    key: 12,
    name: 'John Brown jr.',
    age: 30,
    address: 'New York No. 3 Lake Park',
    children: [{
      key: 121,
      name: 'Jimmy Brown',
      age: 16,
      address: 'New York No. 3 Lake Park',
    }],
  }, {
    key: 13,
    name: 'Jim Green sr.',
    age: 72,
    address: 'London No. 1 Lake Park',
    children: [{
      key: 131,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park',
      children: [{
        key: 1311,
        name: 'Jim Green jr.',
        age: 25,
        address: 'London No. 3 Lake Park',
      }, {
        key: 1312,
        name: 'Jimmy Green sr.',
        age: 18,
        address: 'London No. 4 Lake Park',
      }],
    }],
  }],
}, {
  key: 2,
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
