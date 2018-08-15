import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

import { Utilfetch } from '../../utils/fetch'
import { isLogin } from '../../utils/tool'
import { userLogin } from '../../store/user/action'
import './index.scss'

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 发起登陆请求
        Utilfetch.post('/adminuser/signin',{
          username: values.userName,
          password: values.password
        }).then((res) => {
          localStorage.setItem('MYTOKEN',res.extra.token)
          this.props.dispatch(userLogin(res.data))
          this.props.history.push('/')
        })
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


