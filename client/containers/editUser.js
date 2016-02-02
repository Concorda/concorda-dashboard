'use strict'

import React from 'react'
import {connect} from 'react-redux'
import LinkedStateMixin from 'react-addons-linked-state-mixin'

import {upsertUser} from '../actions/users'

export const EditUser = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function () {
    return this.props.editUser || {}
  },
  componentDidMount () {
  },

  componentWillUnmount () {
  },

  handleSubmit (event) {
    event.preventDefault()
    const dispatch = this.props.dispatch
    const {name, email} = this.refs

    const data = {
      name: name.value,
      email: email.value
    }
    const userId = this.props.params.id || null
    dispatch(upsertUser(userId, data))
  },

  handleChangePassword (event) {
    event.preventDefault()

    const dispatch = this.props.dispatch
    const {password, repeat} = this.refs

    const data = {
      password: password.value,
      repeat: repeat.value
    }
    const userId = this.props.params.id || null
    dispatch(upsertUser(userId, data))
  },

  render () {
    const {editUser} = this.props

    return (
      <div className="page container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Edit User</h2>
        </div>

        {(() => {
          if (editUser) {
            return (
              <form className="login-form col-xs-12 txt-left form-full-width form-panel" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <input ref="name" placeholder="Name" className="input-large" valueLink={this.linkState('name')}/>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <input ref="email" type="email" placeholder="Email" className="input-large"
                           valueLink={this.linkState('email')}/>
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

        <div className="row middle-xs">
          <h2 className="col-xs-12 col-sm-6">Change Password</h2>
        </div>

        {(() => {
          if (editUser) {
            return (
              <form className="login-form col-xs-12 txt-left form-full-width form-panel"
                    onSubmit={this.handleChangePassword}>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <input ref="password" type="password" placeholder="Password" className="input-large"/>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <input ref="repeat" type="password" placeholder="Confirm Password" className="input-large"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                    <button type="submit" className="btn btn-large submit">Change Password</button>
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
