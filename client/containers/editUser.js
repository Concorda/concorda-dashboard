'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {toggleSidebar} from '../actions/sidebar'
import {getUser} from '../actions/users'

export const EditUser = React.createClass({
  componentDidMount () {
    const dispatch = this.props.dispatch

    var userId = this.props.params.id
    dispatch(getUser(userId))
  },

  render () {
    const {isExpanded, editUser} = this.props
    const handleToggle = this.handleToggle

    return (
      <div className="page container-fluid">
        <div className="row middle-xs">
          <h2 className="col-xs-12 col-sm-6">Edit User</h2>
        </div>

        {(() => {
          if (editUser) {
            return (
              <form className="login-form col-xs-12 txt-left form-full-width form-panel">
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <input ref="name" placeholder="Name" className="input-large" value={editUser.name} required />
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <input ref="email" type="email" placeholder="Email" className="input-large" value={editUser.email} required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <input ref="password" type="password" placeholder="Password" className="input-large" required />
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <input ref="repeat" type="password" placeholder="Confirm Password" className="input-large" required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                    <button type="submit" className="btn btn-large submit">Submit</button>
                  </div>
                </div>
              </form>
            )
          }
        })()}
      </div>
    )
  }
})

export default connect((state) => {
  return {
    editUser: state.users.editUser ? state.users.editUser[0] : null
  }
})(EditUser)

function runIf(bool, arrow) {
  if (typeof bool === 'function') arrow = bool
  if (bool) return arrow()
}
