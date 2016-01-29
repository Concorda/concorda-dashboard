'use strict'

import React from 'react'
import {connect} from 'react-redux'

import {upsertUser} from '../actions/users'

export const AddUser = React.createClass({
  handleSubmit(event){
    event.preventDefault()
    const dispatch = this.props.dispatch
    const {name, email, password, repeat} = this.refs

    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
      repeat: repeat.value
    }

    dispatch(upsertUser(null, data))
  },

  render () {
    return (
      <div className="page container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Add User</h2>
        </div>

        <form className="login-form col-xs-12 txt-left form-full-width form-panel" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <input ref="name" placeholder="Name" className="input-large" required />
            </div>
            <div className="col-xs-12 col-sm-6">
              <input ref="email" type="email" placeholder="Email" className="input-large" required />
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
      </div>
    )
  }
})

export default connect((state) => {
  return {

  }
})(AddUser)
