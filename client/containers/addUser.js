'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form';

import {upsertUser} from '../actions/users'

import {validateAddUser} from '../bootstrap/validations'

export let AddUser = React.createClass({
  propTypes: {
    handleSubmit: React.PropTypes.func.isRequired
  },
  createUser(data){
    const dispatch = this.props.dispatch

    dispatch(upsertUser(null, data))
  },

  render () {
    const { fields: {name, email, password, repeat}, handleSubmit } = this.props;
    return (
      <div className="page container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Add User</h2>
        </div>

        <form className="login-form col-xs-12 txt-left form-full-width form-panel" onSubmit={handleSubmit(this.createUser)}>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <input type="text" {...name} placeholder="Name" className="input-large"/>
              {name.error && name.touched && <div className="form-err">{name.error}</div>}
            </div>
            <div className="col-xs-12 col-sm-6">
              <input type="email" {...email} placeholder="Email" className="input-large"/>
              {email.error && email.touched && <div className="form-err">{email.error}</div>}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <input type="password" {...password} placeholder="Password" className="input-large"/>
              {password.error && password.touched && <div className="form-err">{password.error}</div>}
            </div>
            <div className="col-xs-12 col-sm-6">
              <input type="password" {...repeat} placeholder="Confirm Password" className="input-large"/>
              {repeat.error && repeat.touched && <div className="form-err">{repeat.error}</div>}
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

AddUser = reduxForm({
  form: 'addUser',
  fields: ['name', 'email', 'password', 'repeat'],
  validate: validateAddUser
})(AddUser)

export default connect((state, ownProps) => {
  return {

  }
})(AddUser)
