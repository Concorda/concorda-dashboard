'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import RadioGroup from 'react-radio-group'
import CheckboxGroup from 'react-checkbox-group'

import {upsertClient} from '../actions/client'

import {validateAddClient} from '../lib/validations'

export let AddClient = React.createClass({
  propTypes: {
    handleSubmit: React.PropTypes.func.isRequired
  },
  getInitialState () {
    return {
      registerType: 'closed',
      authType: []
    }
  },
  createClient (data) {
    const dispatch = this.props.dispatch
    data.registerType = this.state.registerType
    data.authType = this.state.authType
    dispatch(upsertClient(null, data))
  },

  handleRegisterTypeChange (value) {
    this.setState({registerType: value})
  },

  handleAuthTypeChange () {
    let selectedValues = this.refs.authType.getCheckedValues()
    this.setState({authType: selectedValues})
  },

  render () {
    const { fields: {name, url, registerType, authType}, handleSubmit } = this.props
    return (
      <div className="page container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Add Client</h2>
        </div>

        <form className="login-form col-xs-12 txt-left form-full-width form-panel"
              onSubmit={handleSubmit(this.createClient)}>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <input type="text" {...name} placeholder="Name" className="input-large"/>
              {name.error && name.touched && <div className="form-err">{name.error}</div>}
            </div>
            </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <input type="text" {...url} placeholder="Url" className="input-large"/>
              {url.error && url.touched && <div className="form-err">{url.error}</div>}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="row">
                Register Type
                <RadioGroup name="registerType" selectedValue={this.state.registerType} onChange={this.handleRegisterTypeChange}>
                  {Radio => (
                    <div className="row">
                      <Radio value="public"/>Public
                      <Radio value="closed"/>Closed
                    </div>
                  )}
                </RadioGroup>
              </div>
              {registerType.error && registerType.touched && <div className="form-err">{registerType.error}</div>}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="row">
                Authentication Type
                <CheckboxGroup name="authType" value={this.state.authType} ref="authType" onChange={this.handleAuthTypeChange}>
                  <div>
                    <label>
                      <input type="checkbox" value="github"/>GitHub
                    </label>
                    <label>
                      <input type="checkbox" value="twitter"/>Twitter
                    </label>
                    <label>
                      <input type="checkbox" value="google"/>Google
                    </label>
                  </div>
                </CheckboxGroup>
                {authType.error && authType.touched && <div className="form-err">{authType.error}</div>}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
              <button type="submit" className="btn btn-large submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
})

AddClient = reduxForm({
  form: 'addClient',
  fields: ['name', 'url', 'registerType', 'authType'],
  validate: validateAddClient
})(AddClient)

export default connect((state, ownProps) => {
  return {
  }
})(AddClient)
