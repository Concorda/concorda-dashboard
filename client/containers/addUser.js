'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Sidebar from '../components/sidebar'
import UserTemplate from '../components/userTemplate'
import {toggleSidebar} from '../actions/sidebar'

export const AddUser = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    isExpanded: React.PropTypes.bool.isRequired
  },

  componentDidMount () {
  },

  componentWillUnmount () {
  },

  handleToggle (event) {
    event.preventDefault()

    this.props.dispatch(toggleSidebar())
  },

  render () {
    const {isExpanded} = this.props
    const handleToggle = this.handleToggle

    var styleClass = 'overview-panel'
    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      <main className="page page-overview overview" role="main">
        <div className="container-fluid">
          <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
          <div className={styleClass}>
            <h2>Add User</h2>
            <form className="login-form col-xs-12 col-md-8 col-lg-6 txt-left form-full-width form-panel">
              <UserTemplate />
            </form>
          </div>
        </div>
      </main>
    )
  }
})

function mapStatesToProps (state) {
  const {sidebar} = state

  return {
    isExpanded: sidebar.isExpanded
  }
}

export default connect(mapStatesToProps)(AddUser)
