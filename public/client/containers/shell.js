'use strict'

import React from 'react'
import {connect} from 'react-redux'

import Header from '../components/header'
import Footer from '../components/footer'

import {getLoggedInUserProfile} from '../actions/profile'

export const Shell = React.createClass({
  handleEditUserProfile () {
    this.props.dispatch(getLoggedInUserProfile())
  },

  render () {
    const {children, isLoggedIn} = this.props

    return (
      <div className="shell">
        <Header showProfile={isLoggedIn} handleEditUserProfile={this.handleEditUserProfile} />

        <div className="page-wrapper">
          {children}
        </div>

        <Footer />
      </div>
    )
  }
})

export default connect((state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
})(Shell)
