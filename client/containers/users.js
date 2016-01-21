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

  componentDidMount () {
    const dispatch = this.props.dispatch

    dispatch(getUsers())
  },

  componentWillUnmount () {
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
    const dispatch = this.props.dispatch

    dispatch(pushPath('user/' + userId + '/edit'))
  },

  render () {
    const {isExpanded} = this.props
    const handleToggle = this.handleToggle
    let items = this.props.result

    var styleClass = 'overview-panel'
    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      <main className="page page-users" role="main">
        <div className="container-fluid">
          <Sidebar isExpanded={isExpanded} onToggle={handleToggle}/>
          <div className={styleClass}>
            <h2>Users</h2>
            <Grid data={items} handleEditUser={this.handleEditUser}/>
            <br /><br /><br />
            <button onClick={this.handleAddNewUser}>Add New User</button>
          </div>
        </div>
      </main>
    )
  }
})

function mapStatesToProps (state) {
  const {sidebar} = state
  const {users} = state

  return {
    isExpanded: sidebar.isExpanded,
    result: users.result
  }
}

export default connect(mapStatesToProps)(Users)
