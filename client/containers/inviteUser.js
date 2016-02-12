'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {pushPath} from 'redux-simple-router'

import {sendInviteUser} from '../actions/users'

import {validateInviteUser} from '../lib/validations'


export let InviteUser = React.createClass({
  propTypes: {
    handleSubmit: React.PropTypes.func.isRequired
  },

  inviteUser(data){
    const dispatch = this.props.dispatch
    dispatch(sendInviteUser(data))
  },

  render () {
    const {props, inviteUser} = this
    const { fields: {email, message}, handleSubmit } = props

    return (
      <main className="page page-pass-reset" role="main">
        <div className="container-fluid">
          <div className="row middle-xs center-xs vertical-center">
            <form className="login-form col-xs-12 col-md-6 col-lg-4 txt-left form-full-width form-panel"
                  onSubmit={handleSubmit(inviteUser)}>

              <h2 className="alert mt0 has-icon">
                <span>Invite new user</span>
              </h2>

              <h3>
                Enter email address of user who you want to invite along with a message.
              </h3>

              <input type="email" {...email} placeholder="Enter person email address" className="input-large"/>
              {email.error && email.touched && <div className="form-err">{email.error}</div>}

              <textarea {...message} placeholder="And your message" className="input-large"/>

              <button type="submit" className="btn btn-large submit">Send user invite</button>
            </form>
          </div>
        </div>
      </main>
    )
  }
})

InviteUser = reduxForm({
  form: 'inviteUser',
  fields: ['email', 'message'],
  validate: validateInviteUser
})(InviteUser)

export default connect((state) => {
  return {}
})(InviteUser)
