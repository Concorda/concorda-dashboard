'use strict'

import React from 'react'
import {connect} from 'react-redux'

export const SetPassword = React.createClass({
  setPassword(){
    alert('a')
  },

  render () {
    const {token} = this.props.params
    return (
      <main className="page page-pass-reset" role="main">
        <div className="container-fluid">
          <div className="row middle-xs center-xs vertical-center">
            <form className="login-form col-xs-12 col-md-6 col-lg-4 txt-left form-full-width form-panel">

              <h2 className="alert mt0 has-icon">
                <span>Change password for&nbsp;{token}</span>
              </h2>

              <h3>
                Password must contain one lowercase letter, one number, and be at least 7 characters long.
              </h3>

              <input ref="pass" type="password" placeholder="Password" className="input-large" required />
              <input ref="pass" type="password" placeholder="Confirm Password" className="input-large" required />
              <button type="submit" className="btn btn-large submit" onClick={this.setPassword}>Change password</button>
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
})(SetPassword)
