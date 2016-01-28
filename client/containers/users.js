'use strict'

import React from 'react'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'

// actions
import {getUsers, deleteUser, getUser, closeSession} from '../actions/users'

import Panel from '../components/panel'

export const Users = React.createClass({
  componentDidMount () {
    this.props.dispatch(getUsers())
  },

  handleAdd () {
    this.props.dispatch(pushPath('user/add'))
  },

  handleEdit(userId){
    this.props.dispatch(getUser(userId, `user/${userId}/edit`))
  },

  handleDelete (id) {
    this.props.dispatch(deleteUser(id))
  },

  handleCloseSession (id) {
    this.props.dispatch(closeSession(id))
  },

  render () {
    const {users} = this.props
    let body = null

    if (users) {
      body = (
        <div className="user-list">
            <div className="user-list-heading cf">
              <div className="user-list-cell"><h4 className="m0">Name</h4></div>
              <div className="user-list-cell"><h4 className="m0">Email</h4></div>
              <div className="user-list-cell"><h4 className="m0">Actions</h4></div>
            </div>

            {users.map((user) => {
              return (
                <div key={user.id} className="user-list-row cf">
                  <div className="user-list-cell">{user.name}</div>
                  <div className="user-list-cell">{user.email}</div>
                  <div className="user-list-cell">
                    <ul className="list-unstyled list-inline">
                      <li><a onClick={() => {this.handleEdit(user.id)}}>Edit</a></li>
                      <li><a onClick={() => {this.handleDelete(user.id)}}>Delete</a></li>
                      <li><a onClick={() => {this.handleCloseSession(user.id)}}>Close Session</a></li>
                    </ul>  
                  </div>
                </div>
              )
            })}
        </div>
      )
    }

    return (
      <div className="page page-users container-fluid">
        <div className="row middle-xs">
          <h2 className="col-xs-4 col-sm-6">Users</h2>
          <div className="col-xs-8 col-sm-6 txt-right">
            <button onClick={(e) => {this.handleAdd()}} className="btn">Add User</button>
          </div>
        </div>
        <Panel title={'User List'}>
          {body}
        </Panel>
      </div>
    )
  }
})

export default connect((state) => {
  return {
    users: state.users.result
  }
})(Users)
