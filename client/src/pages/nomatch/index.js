import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import HomeLayout from '../../containers/layouts/HomeLayout'

class NoMatch extends Component {
  render () {
    return (
      <HomeLayout>
        <div>404</div>
        <Link to="/">home</Link>
      </HomeLayout>
    )
  }
}
export default NoMatch


