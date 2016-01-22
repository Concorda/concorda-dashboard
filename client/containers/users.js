'use strict'

import React from 'react'
import { pushPath } from 'redux-simple-router'
import {Link} from 'react-router'
import {connect} from 'react-redux'

// actions
import {toggleSidebar} from '../actions/sidebar'
import {getUsers} from '../actions/users'

// components
import Sidebar from '../components/sidebar'
import Grid from '../components/grid'

export const Users = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    isExpanded: React.PropTypes.bool.isRequired
  },

  handleToggle (event) {
    event.preventDefault()
    this.props.dispatch(toggleSidebar())
  },

  handleAddNewUser() {
    this.props.dispatch(pushPath('user/add'))
  },

  handleEditUser(userId, e){
    e.preventDefault()
    this.props.dispatch(pushPath(`user/${userId}/edit`))
  },

  componentDidMount () {
    const dispatch = this.props.dispatch

    dispatch(getUsers())
  },

  render () {
    const handleToggle = this.handleToggle
    const {isExpanded, data} = this.props


    var styleClass = 'page-wrapper'
    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      <div className={styleClass}>
        <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
        <div className="page container-fluid">
          <div className="row middle-xs">
            <h2 className="col-xs-12 col-sm-6">Users</h2>
        </div>
          <div className="alert alert-info alert-has-icon">
            <span className="icon icon-refresh-blue"></span>
            <p className="m0">Loading data...</p>
          </div>

          <div className="panel">
            <h3 className="panel-heading m0">All Users</h3>
            <div className="panel-body">
              <Grid data={data} handleEditUser={this.handleEditUser}/>
              <button onClick={this.handleAddNewUser}>Add New User</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

function mapStatesToProps (state) {
  const {sidebar, users} = state

  return {
    isExpanded: sidebar.isExpanded,
    data: users.result
  }
}

export default connect(mapStatesToProps)(Users)
