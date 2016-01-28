'use strict'

import React from 'react'
import {connect} from 'react-redux'
import LinkedStateMixin from 'react-addons-linked-state-mixin'

import {updateUserProfile} from '../actions/profile'

export const Profile = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return this.props.profile || {}
  },
  componentDidMount () {
  },

  componentWillUnmount () {
  },

  handleSubmit(event){
    event.preventDefault()
    const dispatch = this.props.dispatch
    const {name, email} = this.refs

    const data = {
      name: name.value,
      email: email.value
    }
    const userId = this.props.profile.id || null
    dispatch(updateUserProfile(userId, data))
  },

  render () {
    const {profile} = this.props

    return (
      <div className="page container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Profile</h2>
        </div>

        {(() => {
          if (profile) {
            return (
              <form className="login-form col-xs-12 txt-left form-full-width form-panel" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <input ref="name" placeholder="Name" className="input-large" valueLink={this.linkState('name')} />
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <input ref="email" type="email" placeholder="Email" className="input-large" valueLink={this.linkState('email')} />
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
        })()}
      </div>
    )
  }
})

export default connect((state) => {
  return {
    profile: state.profile.data
  }
})(Profile)