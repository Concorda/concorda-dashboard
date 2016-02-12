'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {pushPath} from 'redux-simple-router'

import {getPasswordReset} from '../actions/users'

import {validateGetPassReset} from '../lib/validations'


export let PasswordReset = React.createClass({
  propTypes: {
    handleSubmit: React.PropTypes.func.isRequired
  },

  resetPassword(data){
    const dispatch = this.props.dispatch

    dispatch(getPasswordReset(data))
  },

  navigate(where){
    const dispatch = this.props.dispatch

    dispatch(pushPath(where))
  },

  render () {
    const {props, navigate, resetPassword} = this
    const { fields: {email}, handleSubmit, message } = props

    return (
      <main className="page page-pass-reset" role="main">
        <div className="container-fluid">
          <div className="row middle-xs center-xs vertical-center">
            {(() => {
              if (!message) {
                return (
                  <form className="login-form col-xs-12 col-md-6 col-lg-4 txt-left form-full-width form-panel"
                        onSubmit={handleSubmit(resetPassword)}>

                    <h2 className="alert mt0 has-icon">
                      <span>Reset your password</span>
                    </h2>

                    <h3>
                      Enter your email address and we will send you a link to reset your password.
                    </h3>

                    <input type="email" {...email} placeholder="Enter your email address" className="input-large"/>
                    {email.error && email.touched && <div className="form-err">{email.error}</div>}

                    <button type="submit" className="btn btn-large submit">Send password reset email</button>
                  </form>
                )
              } else {
                return(
                  <form className="login-form col-xs-12 col-md-6 col-lg-4 txt-left form-full-width form-panel"
                        onSubmit={handleSubmit(function(){ return navigate('/login') })}>

                    <h2 className="alert mt0 has-icon">
                      <span>Reset your password</span>
                    </h2>

                    <h3>{message}</h3>

                    <button type="submit" className="btn btn-large submit">Return to login</button>
                  </form>
                )
              }
            })()}
          </div>
        </div>
      </main>
    )
  }
})

PasswordReset = reduxForm({
  form: 'getPasswordReset',
  fields: ['email'],
  validate: validateGetPassReset
})(PasswordReset)

export default connect((state) => {
  const {message} = state.users
  return {
    message: message
  }
})(PasswordReset)
