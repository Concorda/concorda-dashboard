'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/auth'

export const Login = React.createClass({
  componentDidMount () {},

  do_login (event) {
    event.preventDefault()

    const {email, pass} = this.refs
    const {dispatch} = this.props

    dispatch(login(email.value, pass.value))

    email.value = ''
    pass.value = ''
  },

  render () {
    const {hasError, niceError} = this.props
    let heading = hasError ? niceError : 'Login'

    let msgClass = 'alert mt0 has-icon'
    let iconClass = 'icon icon-signin'

    if (hasError) {
      msgClass = `mt0 has-icon alert alert-error`
    }

    return (
      <main className="page page-login" role="main">
        <div className="container-fluid">
          <div className="row middle-xs center-xs vertical-center">
            <form className="login-form col-xs-12 col-md-6 col-lg-4 txt-left form-full-width form-panel">

              <h2 className={msgClass}>
                <span className={iconClass}></span>
                <span>{heading}</span>
              </h2>

              <input ref="email" type="email" placeholder="Email" className="input-large" required />
              <input ref="pass" type="password" placeholder="Password" className="input-large" required />
              <button type="submit" className="btn btn-large submit" onClick={this.do_login}>Submit</button>
              <div className="panel-footer">
                <a className="btn btn-secondary" href="/register">Sign in</a>
                <br /><br />
                <p>Or log in using one of the following services:</p>
                <button className="btn btn-secondary btn-github has-icon"><span className="icon icon-github"></span> Github</button>
                <button className="btn btn-secondary btn-twitter has-icon"><span className="icon icon-twitter"></span> Twitter</button>
                <a className="btn btn-secondary btn-google has-icon" href="/auth/login_google"><span className="icon icon-google"></span> Google</a>
              </div>
              <br/>
              <a href="/password_reset">Forgot password?</a>
            </form>
          </div>
        </div>
      </main>
    )
  }
})

export default connect((state) => {
  const {hasError, niceError} = state.auth

  return {
    hasError: hasError,
    niceError: niceError
  }
})(Login)
