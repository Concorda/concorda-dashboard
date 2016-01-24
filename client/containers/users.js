'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {pushPath} from 'redux-simple-router'
import {getUsers, deleteUser} from '../actions/users'

import Panel from '../components/panel'

export const Users = React.createClass({
  componentDidMount () {
    this.props.dispatch(getUsers())
  },

  handleAdd () {
    this.props.dispatch(pushPath('user/add'))
  },

  handleEdit (id) {
    this.props.dispatch(pushPath(`user/${id}/edit`))
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
                  <td>
                    <button onClick={(e) => {this.handleEdit(user.id)}}>Edit</button>
                    <button onClick={(e) => {this.handleDelete(user.id)}}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }

    return (
      <div className="page container-fluid">
        <div className="row middle-xs">
          <h2 className="col-xs-12 col-sm-6">Users</h2>
        </div>
        <Panel title={'User List'}>
          {body}
          <button onClick={(e) => {this.handleAdd()}}>Add New User</button>
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
