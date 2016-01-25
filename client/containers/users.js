'use strict'

import React from 'react'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'

// actions
import {getUsers, deleteUser, getUser} from '../actions/users'

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

  render () {
    const {users} = this.props
    let body = null

    if (users) {
      body = (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="btn-group">
                    <button onClick={() => {this.handleEdit(user.id)}} className="btn btn-small btn-dimmed">Edit</button>
                    <button onClick={() => {this.handleDelete(user.id)}} className="btn btn-small btn-dimmed">Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }

    return (
      <div className="page page-users container-fluid">
        <div className="row middle-xs">
          <h2 className="col-xs-12 col-sm-6">Users</h2>
        </div>
        <Panel title={'User List'}>
          {body}
          <button onClick={(e) => {this.handleAdd()}} className="btn btn-spaced">Add New User</button>
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
