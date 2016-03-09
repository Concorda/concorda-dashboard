'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import {loadPasswordResetUser, setNewPassword} from '../../../modules/user/actions/index'
import {validateSetNewPassword} from '../../../lib/validations'


export let SetPassword = React.createClass({
  propTypes: {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  },
  componentDidMount () {
    this.props.dispatch(loadPasswordResetUser(this.props.params.token))
  },

  setPassword (data) {
    const dispatch = this.props.dispatch
    dispatch(setNewPassword(data, this.props.params.token))
  },

  render () {
    const { fields: {password, repeat}, handleSubmit } = this.props
    const {resetUser} = this.props

    return (
      <main className="page page-pass-reset" role="main">
        <div className="container-fluid">
          <div className="row middle-xs center-xs vertical-center">
            {(() => {
              if (resetUser) {
                return (
                  <form className="login-form col-xs-12 col-md-6 col-lg-4 txt-left form-full-width form-panel"
                        onSubmit={handleSubmit(this.setPassword)}>

                    <h2 className="alert mt0 has-icon">
                      <span>Change password for&nbsp;{resetUser.nick}</span>
                    </h2>

                    <h3>
                      Password must contain one lowercase letter, one number, and be at least 7 characters long.
                    </h3>

                    <input type="password" {...password} placeholder="Password" className="input-large"/>
                    {password.error && password.touched && <div className="form-err">{password.error}</div>}

                    <input type="password" {...repeat} placeholder="Confirm Password" className="input-large"/>
                    {repeat.error && repeat.touched && <div className="form-err">{repeat.error}</div>}

                    <button type="submit" className="btn btn-large submit">Change password</button>
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

SetPassword = reduxForm({
  form: 'setPassword',
  fields: ['password', 'repeat'],
  validate: validateSetNewPassword
},
  state => ({
    initialValues: state.user.resetUser ? state.user.resetUser : null
  })
)(SetPassword)

export default connect((state) => {
  return {
    resetUser: state.user.resetUser ? state.user.resetUser : null
  }
})(SetPassword)
