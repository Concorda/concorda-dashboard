'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Header from '../components/header'
import Footer from '../components/footer'

export const Shell = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
  },

  render () {
    const {children, isLoggedIn} = this.props

    return (
      <div className="shell">
        <Header showProfile={isLoggedIn} />
          {children}
        <Footer />
      </div>
    )
  }
})

function mapStatesToProps (state) {
  const {auth} = state

  return {
    isLoggedIn: Boolean(auth.isLoggedIn)
  }
}

export default connect(mapStatesToProps)(Shell)
