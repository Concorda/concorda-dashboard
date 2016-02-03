'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import {upsertUser, getUser} from '../actions/users'
import {validateEditUser} from '../bootstrap/validations'

export const fields = ['name', 'email', 'password', 'repeat'];

export let EditUser = React.createClass({
  propTypes: {
    fields: React.PropTypes.func.isRequired,
    load: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  },
  componentDidMount () {
    this.props.dispatch(getUser(this.props.params.id))
  },

  componentWillUnmount () {
  },

  updateUser (data) {
    const dispatch = this.props.dispatch
    const {name, email} = this.refs

    /*const data = {
      name: name.value,
      email: email.value
    }*/
    const userId = this.props.params.id || null
    dispatch(upsertUser(userId, data))
  },

  changePass (data) {
    const dispatch = this.props.dispatch
    const {password, repeat} = this.refs

  /*  const data = {
      password: password.value,
      repeat: repeat.value
    }*/
    const userId = this.props.params.id || null
    dispatch(upsertUser(userId, data))
  },

  render () {
    debugger
    const { fields: {name, email, password, repeat}, handleSubmit, load } = this.props
    const {editUser} = this.props

    if (editUser) {
      debugger
      load(editUser)
    }

    return (
      <div className="page container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Edit User</h2>
        </div>

        {(() => {
          if (editUser) {
            return (
              <form className="login-form col-xs-12 txt-left form-full-width form-panel"
                    onSubmit={handleSubmit(this.updateUser)}>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <input {...name} placeholder="Name" className="input-large"/>
                    {name.error && name.touched && <div className="form-err">{name.error}</div>}
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <input type="email" {...email} placeholder="Email" className="input-large"/>
                    {email.error && email.touched && <div className="form-err">{email.error}</div>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                    <button type="submit" className="btn btn-large submit">Save</button>
                  </div>
                </div>
              </form>
            )
          }
        })()}

        <div className="row middle-xs">
          <h2 className="col-xs-12 col-sm-6">Change Password</h2>
        </div>

        {(() => {
          if (editUser) {
            return (
              <form className="login-form col-xs-12 txt-left form-full-width form-panel"
                    onSubmit={handleSubmit(this.changePass)}>
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
                    <button type="submit" className="btn btn-large submit">Change Password</button>
                  </div>
                </div>
              </form>
            )
          }
        })()}
      </div>
    )
  }
})

EditUser = reduxForm({
    form: 'editUser',
    fields: ['name', 'email', 'password', 'repeat'],
    validate: validateEditUser
  },
  state => ({ // mapStateToProps
    initialValues: state.users.editUser ? state.users.editUser : null
  }),{
    load: getUser
  })(EditUser)

export default connect((state) => {
  return {
    editUser: state.users.editUser ? state.users.editUser : null
  }
})(EditUser)
