'use strict'

import React from 'react'
import {connect} from 'react-redux'
import LinkedStateMixin from 'react-addons-linked-state-mixin'

import {getLoggedInUserProfile, updateUserProfile, editProfile} from '../actions/profile'

export const Profile = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return this.props.profile ||
      {
        name: null,
        email: null
      }
  },

  componentDidMount () {
    this.props.dispatch(getLoggedInUserProfile())
  },

  componentWillUnmount () {
  },

  handleSubmit (event) {
    event.preventDefault()
    const dispatch = this.props.dispatch
    const {name, email} = this.refs

    const data = {
      name: name.value,
      email: email.value
    }
    dispatch(updateUserProfile(data))
  },

  handleEditProfile (event) {
    event.preventDefault()
    this.props.dispatch(editProfile())
  },

  render () {
    const {profile, editProfile} = this.props
    const handleEditProfile = this.handleEditProfile

    return (
      <div className="page page-profile container-fluid">
        <div className="row middle-xs page-heading center-xs">
          <h2 className="col-xs-12 col-sm-6">Profile</h2>
        </div>

        {(() => {
          if (editProfile) {
            return (
              <form className="login-form col-xs-12 txt-left form-full-width form-panel" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <input ref="name" placeholder="Name" className="input-large" valueLink={this.linkState('name')}/>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <input ref="email" type="email" placeholder="Email" className="input-large"
                           valueLink={this.linkState('email')}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                    <button type="submit" className="btn btn-large submit">Submit</button>
                  </div>
                </div>
              </form>
            )
          }
          else if (profile) {
            return (
              <div className="row middle-xs center-xs">
                <div className="login-form col-xs-12 col-md-6 col-lg-4 txt-left form-full-width form-panel">
                  <div class="row center-xs">
                    <img src="/img/dummy.png" className="avatar" />
                  </div>
                  <div className="row">
                    <div className="col-xs-12"><p className="m0 mt"><strong>Name:</strong> {profile.name}</p></div>
                    <div className="col-xs-12"><p><strong>Email:</strong> {profile.email}</p></div>
                  </div>
                  <button onClick={handleEditProfile} className="btn btn-large submit">Edit</button>
                </div>
              </div>
            )
          }
        })()}
      </div>
    )
  }
})

export default connect((state) => {
  return {
    profile: state.profile.data,
    editProfile: state.profile.editProfile
  }
})(Profile)
