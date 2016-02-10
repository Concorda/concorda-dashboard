'use strict'

import React from 'react'
import {connect} from 'react-redux'

export const PasswordReset = React.createClass({
  resetPassword(){
    alert('a')
  },

  render () {
    return (
      <main className="page page-pass-reset" role="main">
        <div className="container-fluid">
          <div className="row middle-xs center-xs vertical-center">
            <form className="login-form col-xs-12 col-md-6 col-lg-4 txt-left form-full-width form-panel">

              <h2 className="alert mt0 has-icon">
                <span>Reset your password</span>
              </h2>

              <h3>
                Enter your email address and we will send you a link to reset your password.
              </h3>

              <input ref="email" type="email" placeholder="Enter your email address" className="input-large" required />
              <button type="submit" className="btn btn-large submit" onClick={this.resetPassword}>Send password reset email</button>
            </form>
          </div>
        </div>
      </main>
    )
  }
})

export default connect((state) => {
  return {
  }
})(PasswordReset)
