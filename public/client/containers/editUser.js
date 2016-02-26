'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import Select2 from 'react-select2-wrapper'
import _ from 'lodash'

import {upsertUser, getUser} from '../actions/user'
import getTags from '../modules/tag/actions/getTags'
import {validateEditUser} from '../lib/validations'

export let EditUser = React.createClass({
  propTypes: {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      defaultTags: null,
      tagsChanged: false
    }
  },

  componentDidMount () {
    this.props.dispatch(getUser(this.props.params.id))
    this.props.dispatch(getTags())
  },

  componentWillReceiveProps: function (nextProps) {
    if(nextProps.editUser && nextProps.editUser.tags){
      this.setState({
        defaultTags: nextProps.editUser.tags
      })
    }
  },

  updateUser (data) {
    const selectedTags = this.refs.tags.el.val()
    const dispatch = this.props.dispatch
    const userId = this.props.params.id || null
    data = _(data).omit(_.isUndefined).omit(_.isNull).value()
    data.tags = selectedTags
    data.tagsChanged = this.state.tagsChanged
    dispatch(upsertUser(userId, data))
  },

  changePass (data) {
    const dispatch = this.props.dispatch
    const userId = this.props.params.id || null
    dispatch(upsertUser(userId, data))
  },

  tagsOnChange () {
    this.setState({tagsChanged: true})
  },

  render () {
    const { fields: {name, email, password, repeat}, handleSubmit } = this.props
    const {editUser, tags} = this.props

    return (
      <div className="page container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Edit User</h2>
        </div>

        {(() => {
          if (editUser && tags) {
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
                  <div className="col-xs-12 col-sm-6">
                    <Select2 multiple className="input-large select2-custom" ref="tags"
                             data={tags} defaultValue={this.state.defaultTags} onChange={this.tagsOnChange}
                             options={{placeholder: 'search by tags', tags: true, theme: 'classic'}}
                    />
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

EditUser = reduxForm(
  {
    form: 'editUser',
    fields: ['name', 'email', 'password', 'repeat'],
    validate: validateEditUser
  },
  state => ({
    initialValues: state.user.editUser ? state.user.editUser : null
  }))(EditUser)

export default connect((state) => {
  return {
    editUser: state.user.editUser ? state.user.editUser : null,
    tags: state.tag.list ? state.tag.list : null
  }
})(EditUser)
