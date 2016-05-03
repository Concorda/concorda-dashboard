'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {login} from '../../../modules/auth/actions/index'

export const Login = React.createClass({
  do_login (event) {
    event.preventDefault()

    const {email, pass} = this.refs
    const {dispatch, params} = this.props

    let data = {
      username: email.value,
      password: pass.value
    }

    if (params && params.callback_url) {
      data.callback_url = params.callback_url
    }

    dispatch(login(data))

    email.value = ''
    pass.value = ''
  },

  render () {
    const {hasError, niceError, configuration} = this.props
    let heading = hasError ? niceError : 'Login'

    let msgClass = 'alert mt0 has-icon'
    let iconClass = 'icon icon-signin'

    if (hasError) {
      msgClass = `mt0 has-icon alert alert-error`
    }

    let register = null
    let textMessage = null
    let configurableBody = null
    let githubStrategy = null
    let twitterStrategy = null
    let googleStrategy = null

    if (configuration) {

      // disable external auth strategies for now
      // this is a hack until proper user rights will be fully implemented
      // because we do not have user rights the external auth is disabled to control the users with Concorda access
      configuration.authType = {
        github: "0",
        twitter: "0",
        google: "0"
      }

      if (configuration.concordaPublicRegister === "1") {
        register = (<a className="btn btn-secondary" href="/register">Sign in</a>)
      }

      if (configuration.authType && configuration.authType.github === "1") {
        githubStrategy = (<a className="btn btn-secondary btn-github has-icon" href="/auth/login_github">
          <span className="icon icon-github"> </span> Github
        </a>)
      }

      if (configuration.authType && configuration.authType.twitter === "1") {
        twitterStrategy = (<a className="btn btn-secondary btn-twitter has-icon" href="/auth/login_twitter">
          <span className="icon icon-twitter"> </span> Twitter</a>)
      }

      if (configuration.authType && configuration.authType.google === "1") {
        googleStrategy = (<a className="btn btn-secondary btn-google  has-icon" href="/auth/google"> <span
          className="icon icon-google"> </span> Google</a>)
      }

      if (githubStrategy || twitterStrategy || googleStrategy) {
        textMessage = (<span><br /><br /> <p>Or log in using one of the following services:</p></span>)
      }

      configurableBody = (
        <div className="panel-footer">
          {register}
          {textMessage}
          {githubStrategy}
          {twitterStrategy}
          {googleStrategy}
        </div>
      )
    }

    return (
      <main className="page page-login" role="main">
        <div className="container-fluid">
          <div className="row middle-xs center-xs vertical-center">
            <form className="login-form col-xs-12 col-md-6 col-lg-6 txt-left form-full-width form-panel">

              <h2 className={msgClass}>
                <span className={iconClass}></span>
                <span>{heading}</span>
              </h2>

              <input ref="email" type="email" placeholder="Email" className="input-large" required/>
              <input ref="pass" type="password" placeholder="Password" className="input-large" required/>
              <button type="submit" className="btn btn-large submit" onClick={this.do_login}>Submit</button>
              <div className="panel-footer">
                {configurableBody}
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
    niceError: niceError,
    configuration: state.settings.data
  }
})(Login)
