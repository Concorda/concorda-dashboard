'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import Select2 from 'react-select2-wrapper'
import CustomUserFields from '../components/customUserFields'
import _ from 'lodash'

import {upsertUser, getUser} from '../../../modules/user/actions/index'
import {getGroups} from '../../../modules/group/actions/index'
import {validateEditUser} from '../../../lib/validations'

export let EditUser = React.createClass({
  propTypes: {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      defaultGroups: null,
      groupsChanged: false
    }
  },

  componentDidMount () {
    this.props.dispatch(getGroups())
    this.props.dispatch(getUser(this.props.params.id))
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.editUser && nextProps.editUser.tags) {
      this.setState({
        defaultGroups: _.map(nextProps.editUser.tags, 'id')
      })
    }
  },

  updateUser (data) {
    const selectedGroups = this.refs.groups.el.val()
    const dispatch = this.props.dispatch
    const userId = this.props.params.id || null
    data = _(data).omit(_.isUndefined).omit(_.isNull).value()
    data.groups = selectedGroups
    data.groupsChanged = this.state.groupsChanged
    dispatch(upsertUser(userId, data))
  },

  changePass (data) {
    const dispatch = this.props.dispatch
    const userId = this.props.params.id || null
    dispatch(upsertUser(userId, data))
  },

  groupsOnChange () {
    this.setState({groupsChanged: true})
  },

  render () {
    const { groups, editUser, fields: {name, email, password, repeat, custom}, handleSubmit } = this.props

    return (
      <div className="page container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Edit User</h2>
        </div>

        {(() => {
          if (editUser && groups) {
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
                    <Select2 multiple className="input-large select2-custom" ref="groups"
                             data={groups} defaultValue={this.state.defaultGroups} onChange={this.groupsOnChange}
                             options={{placeholder: 'Search Groups', groups: true, theme: 'classic'}}
                    />
                  </div>
                </div>

                <CustomUserFields user={editUser}/>

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
    fields: ['name', 'email', 'password', 'repeat', 'custom'],
    validate: validateEditUser
  },
  state => ({
    initialValues: state.user.editUser ? state.user.editUser : null
  }))(EditUser)

export default connect((state) => {
  return {
    editUser: state.user.editUser ? state.user.editUser : null,
    groups: state.group.list ? state.group.list : null
  }
})(EditUser)
