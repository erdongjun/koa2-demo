/*
 * @Author: chenweizhi 
 * @Date: 2018-08-17 20:47:08 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-08-23 21:26:36
 */
// core 核心组件
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Form, Icon, Input, Button, Checkbox, message } from 'antd'
const FormItem = Form.Item
// 公共函数
import { isLogin } from '../../utils/tool'
// async 异步请求函数

import { asyncuserLogin } from '../../store/user/index'
import { asyncMenuList } from '../../store/menu/index'

// css
import './index.scss'
class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
       let result =await asyncuserLogin({
            username: values.userName,
            password: values.password
        })
        if(result.code === 1){
          localStorage.setItem('MYTOKEN',result.extra.token)
          localStorage.setItem('USERINFO',JSON.stringify(result.data))
          let res = await asyncMenuList({uid:result.data.uid})
          if(res.code == 1){
            localStorage.setItem('MENULIST',JSON.stringify(res))
            this.props.history.push('/')
          }else{
            message.error(res.msg)
          }

        }else{
          message.error(result.msg)
        }
      }
    })
  }
  componentDidMount (){
    if(isLogin()){
      this.props.history.push('/')
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <div className="login-form">
          <h2>管理后台登陆</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <Button type="primary" htmlType="submit" className="login-form-button">Login</Button>
            </FormItem>
          </Form>
        </div>
      </Layout>
    );
  }
}
const Login = Form.create()(LoginForm)
export default connect(({ userInfo }) => ({ userInfo }))(Login)


