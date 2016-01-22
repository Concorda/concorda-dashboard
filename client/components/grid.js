'use strict'

import React from 'react'

export default React.createClass({
  render () {
    const handleEditUser = this.props.handleEditUser
    const handleDeleteUser = this.props.handleDeleteUser

    let body = null
    let data = this.props.data

    if (!data || data.length <= 0) {
      body = (
        <tr className="alert alert-info alert-has-icon txt-left">
          <td>No users found</td>
        </tr>
      )
    }
    else {
      body = data.map((user) => {
        let boundEditUserClick = handleEditUser.bind(null, user.id);
        let boundDeleteUserClick = handleDeleteUser.bind(null, user.id);

        return (
          <tr key={user.id}>
            <td className="user-data-col">{user.name}</td>
            <td className="user-data-col">{user.email}</td>
            <td className="user-data-col">
              <button onClick={boundEditUserClick}>Edit</button>&nbsp;&nbsp;&nbsp;
              <button onClick={boundDeleteUserClick}>Delete</button>
            </td>
          </tr>
        )
      })
    }

    return (
      <table>
        <tbody>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        {body}
        </tbody>
      </table>
    )
  }
})
