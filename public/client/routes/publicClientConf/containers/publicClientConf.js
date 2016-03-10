'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import RadioGroup from 'react-radio-group'
import CheckboxGroup from 'react-checkbox-group'

import {validateInitConfig, saveInitConfig} from '../../../modules/client/actions/index'

import {validateEditClient} from '../../../lib/validations'

export let PublicClientConf = React.createClass({
  propTypes: {
    handleSubmit: React.PropTypes.func.isRequired
  },
  getInitialState () {
    return {
      registerType: 'closed',
      authType: []
    }
  },

  componentDidMount () {
    this.props.dispatch(validateInitConfig())
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.configuration) {
      this.setState({
        registerType: nextProps.configuration.registerType || 'closed',
        authType: nextProps.configuration.authType || []
      })
    }
  },

  updateClient (data) {
    const dispatch = this.props.dispatch
    data.registerType = this.state.registerType
    data.authType = this.state.authType
    data.configured = true

    const clientId = this.props.configuration.id
    const redirectTo = '/login'
    dispatch(saveInitConfig(clientId, data, redirectTo))
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
          <h2 className="col-xs-12 col-sm-6">Initialize Client Configuration</h2>
        </div>

        <form className="login-form col-xs-12 txt-left form-full-width form-panel"
              onSubmit={handleSubmit(this.updateClient)}>
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
                <RadioGroup name="registerType" selectedValue={this.state.registerType}
                            onChange={this.handleRegisterTypeChange}>
                  {Radio => (
                    <div className="row generic-inputs-list">
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
                <CheckboxGroup name="authType" value={this.state.authType} ref="authType"
                               onChange={this.handleAuthTypeChange}>
                  <div className="row generic-inputs-list">
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

PublicClientConf = reduxForm(
  {
    form: 'initClientConf',
    fields: ['name', 'url', 'registerType', 'authType'],
    validate: validateEditClient
  },
  state => ({
    initialValues: state.client.configuration ? state.client.configuration : null
  }))(PublicClientConf)

export default connect((state) => {
  return {
    configuration: state.client.configuration ? state.client.configuration : null
  }
})(PublicClientConf)
