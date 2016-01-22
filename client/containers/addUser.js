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

  handleToggle (event) {
    event.preventDefault()

    this.props.dispatch(toggleSidebar())
  },

  render () {
    const handleToggle = this.handleToggle
    const {isExpanded} = this.props

    var styleClass = 'page-wrapper'
    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      <div className={styleClass}>
        <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
        <div className="page container-fluid">
          <div className="row middle-xs">
            <h2 className="col-xs-12 col-sm-6">Add User</h2>
          </div>

          <div className="alert alert-info alert-has-icon">
            <span className="icon icon-refresh-blue"></span>
            <p className="m0">Loading data...</p>
          </div>

          <form className="login-form col-xs-12 col-md-8 col-lg-6 txt-left form-full-width form-panel">
            <UserTemplate />
          </form>
        </div>
      </div>
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
