'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import {forceChangePassword} from '../../../modules/user/actions/index'
import {validateSetNewPassword} from '../../../lib/validations'

export let ChangePassword = React.createClass({
  propTypes: {
    handleSubmit: React.PropTypes.func.isRequired
  },

  setPassword (data) {
    const dispatch = this.props.dispatch
    dispatch(forceChangePassword(data))
  },

  render () {
    const { fields: {password, repeat}, handleSubmit } = this.props

    return (
      <main className="page page-pass-reset" role="main">
        <div className="container-fluid">
          <div className="row middle-xs center-xs vertical-center">
            <form className="login-form col-xs-12 col-md-6 col-lg-4 txt-left form-full-width form-panel"
                  onSubmit={handleSubmit(this.setPassword)}>

              <h2 className="alert mt0 has-icon">
                <span>You must change your password</span>
              </h2>

              <h3>
                Password must contain at least one lowercase/upercase letter, one number, and be at least 8 characters long.
              </h3>

              <input type="password" {...password} placeholder="Password" className="input-large"/>
              {password.error && password.touched && <div className="form-err">{password.error}</div>}

              <input type="password" {...repeat} placeholder="Confirm Password" className="input-large"/>
              {repeat.error && repeat.touched && <div className="form-err">{repeat.error}</div>}

              <button type="submit" className="btn btn-large submit">Change password</button>
            </form>
          </div>
        </div>
      </main>
    )
  }
})

ChangePassword = reduxForm({
    form: 'setPassword',
    fields: ['password', 'repeat'],
    validate: validateSetNewPassword
  },
  state => ({
    initialValues: state.user.resetUser ? state.user.resetUser : null
  })
)(ChangePassword)

export default connect((state) => {
  const {hasError, niceError} = state.auth

  return {
  }
})(ChangePassword)
