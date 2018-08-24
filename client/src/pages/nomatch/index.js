import React, { Component } from 'react'
import HomeLayout from '../../containers/layouts/HomeLayout'
import './index.scss'

class NoMatch extends Component {
  componentDidMount(){
    this.flag = true
    // setTimeout(() => {
    //   this.props.history.push('/')
    // }, 3000);
  }
  render () {
    return (
      <HomeLayout>
        <div className='nomatch'>
          <p>404，抱歉，页面没找到</p>
          <p>3s后返回首页</p>
        </div>
      </HomeLayout>
    )
  }
}
export default NoMatch


