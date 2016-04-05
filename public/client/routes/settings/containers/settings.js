'use strict'

import React from 'react'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'
import {reduxForm} from 'redux-form'
import _ from 'lodash'
import RadioGroup from 'react-radio-group'
import CheckboxGroup from 'react-checkbox-group'

import {getSettings, upsertSettings} from '../../../modules/settings/actions/index'

export let Settings = React.createClass({
  propTypes: {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
    }
  },

  componentDidMount () {
    const {route, dispatch} = this.props
    dispatch(getSettings())
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.settings) {
      this.setState({
        registerType: nextProps.settings.registerType,
        authType: nextProps.settings.authType
      })
    }
  },

  handleSubmit (data) {
    const {dispatch} = this.props
    data.registerType = this.state.registerType
    data.authType = this.state.authType
    data.appkey = this.state.appkey

    dispatch(upsertSettings(data))
  },

  handleRegisterTypeChange (value) {
    this.setState({registerType: value})
  },

  handleAuthTypeChange: function () {
    let selectedValues = this.refs.authType.getCheckedValues()
    this.setState({authType: selectedValues})
  },

  render () {
    const { settings, fields: {registerType, authType, emailTemplateFolder}, handleSubmit } = this.props

    return (
      <div className="page page-client container-fluid">

        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Master Settings</h2>
        </div>

        {(() => {
          if (settings) {
            return (
              <form className="login-form col-xs-12 txt-left form-full-width form-panel"
                    onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <label>Email templates folder</label>
                    <input {...emailTemplateFolder} placeholder="Email template folder" className="input-large"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-8">
                    <div className="row">
                      <div className="col-xs-2 col-sm-2">
                        Register Type:
                      </div>
                      <div className="col-xs-10 col-sm-6">
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
                    </div>
                    {registerType.error && registerType.touched && <div className="form-err">{registerType.error}</div>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-8">
                    <div className="row">
                      <div className="col-xs-2 col-sm-2">
                        Authentication Type:
                      </div>
                      <div className="col-xs-10 col-sm-6">
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
                      </div>
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
            )
          }
        })()}
      </div>
    )
  }
})


Settings = reduxForm(
  {
    form: 'settings',
    fields: ['registerType', 'authType', 'emailTemplateFolder']
  },
  state => ({
    settings: state.settings.data ? state.settings.data : null
  }))(Settings)

export default connect((state) => {
  return {
    settings: state.settings.data ? state.settings.data : null
  }
})(Settings)
