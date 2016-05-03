'use strict'

import React from 'react'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'
import {reduxForm} from 'redux-form'
import _ from 'lodash'
import RadioGroup from 'react-radio-group'
import CheckboxGroup from 'react-checkbox-group'

import {getSettings, upsertSettings} from '../../../modules/settings/actions/index'

const fields = ['minLength', 'requireNumeric', 'requireLowercase', 'requireUppercase', 'google', 'twitter', 'github', 'publicRegister', 'concordaPublicRegister', 'emailTemplateFolder', 'passwordPolicy']

export let Settings = React.createClass({
  propTypes: {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  },

  componentDidMount () {
    const {route, dispatch} = this.props
    dispatch(getSettings())
  },

  getInitialState () {
    return {
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.settings) {
      this.setState({
        google: this.state.google || nextProps.settings.authType ? nextProps.settings.authType.google : "0",
        github: this.state.github || nextProps.settings.authType ? nextProps.settings.authType.github : "0",
        twitter: this.state.twitter || nextProps.settings.authType ? nextProps.settings.authType.twitter : "0",

        publicRegister: this.state.publicRegister || nextProps.settings.publicRegister || "0",
        concordaPublicRegister: this.state.concordaPublicRegister || nextProps.settings.concordaPublicRegister || "0",

        emailTemplateFolder: this.state.emailTemplateFolder || nextProps.settings.emailTemplateFolder,

        //user policy
        activateAccount: this.state.activateAccount || nextProps.settings.userPolicy ? nextProps.settings.userPolicy.activateAccount : "0",
        forceChangePassword: this.state.forceChangePassword || nextProps.settings.userPolicy ? nextProps.settings.userPolicy.forceChangePassword : "0",
        //password policy
        requireLowercase: this.state.requireLowerCase || nextProps.settings.passwordPolicy ? nextProps.settings.passwordPolicy.requireLowercase : "0",
        requireUppercase: this.state.requireUpperCase || nextProps.settings.passwordPolicy ? nextProps.settings.passwordPolicy.requireUppercase : "0",
        requireNumeric: this.requireNumeric || nextProps.settings.passwordPolicy ? nextProps.settings.passwordPolicy.requireNumeric : "0",
        minLength: this.state.minLength || nextProps.settings.passwordPolicy ? nextProps.settings.passwordPolicy.minLength : 6
      })
    }
  },

  handleSubmit (data) {
    const {dispatch} = this.props

    let settings = {
      authType: {
        google: this.state.google || "0",
        github: this.state.github || "0",
        twitter: this.state.twitter || "0"
      },
      concordaPublicRegister: this.state.concordaPublicRegister || "0",
      publicRegister: this.state.publicRegister || "0",
      emailTemplateFolder: data.emailTemplateFolder,
      passwordPolicy: {
        requireLowercase: this.state.requireLowercase || "0",
        requireNumeric: this.state.requireNumeric || "0",
        requireUppercase: this.state.requireUppercase || "0",
        minLength: data.minLength || 6
      },
      userPolicy: {
        activateAccount: this.state.activateAccount || "0",
        forceChangePassword: this.state.forceChangePassword || "0"
      }
    }

    dispatch(upsertSettings(settings))
  },

  handleRequireLowercaseChange (value) {
    this.setState({requireLowercase: value})
  },

  handleRequireUppercaseChange (value) {
    this.setState({requireUppercase: value})
  },

  handleRequireNumericChange (value) {
    this.setState({requireNumeric: value})
  },

  handleRegisterTypeChange (value) {
    this.setState({publicRegister: value})
  },

  handleConcordaRegisterTypeChange (value) {
    this.setState({concordaPublicRegister: value})
  },

  handleGoogleChange (value) {
    this.setState({google: value})
  },

  handleTwitterChange (value) {
    this.setState({twitter: value})
  },

  handleActivateAccount (value) {
    this.setState({activateAccount: value})
  },

  handleForceChangePassword (value) {
    this.setState({forceChangePassword: value})
  },

  handleGithubChange (value) {
    this.setState({github: value})
  },

  render () {
    const {
      fields: {minLength, emailTemplateFolder},
      settings,
      handleSubmit } = this.props

    return (
      <div className="page page-client container-fluid">

        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Settings</h2>
        </div>

        {(() => {
          if (settings) {
            return (
              <form className="login-form col-xs-8 txt-left form-full-width form-panel"
                    onSubmit={handleSubmit(this.handleSubmit)}>

                <div className="col-xs-12 col-sm-12 form-panel">
                  <div className="col-xs-12 col-sm-12 panel-heading">
                    Authentication
                  </div>

                  <div className="col-xs-12 col-sm-8 panel-body">

                    <div className="row">
                      <div className="col-xs-6 col-sm-6">
                        Concorda public user registration:
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <RadioGroup name="concordaPublicRegister" selectedValue={this.state.concordaPublicRegister}
                                    onChange={this.handleConcordaRegisterTypeChange}>
                          {Radio => (
                            <div className="row generic-inputs-list">
                              <Radio value="1"/>Yes
                              <Radio value="0"/>No
                            </div>
                          )}
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-6 col-sm-6">
                        Public user registration:
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <RadioGroup name="publicRegister" selectedValue={this.state.publicRegister}
                                    onChange={this.handleRegisterTypeChange}>
                          {Radio => (
                            <div className="row generic-inputs-list">
                              <Radio value="1"/>Yes
                              <Radio value="0"/>No
                            </div>
                          )}
                        </RadioGroup>

                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-6 col-sm-6">
                        Google authentication:
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <RadioGroup name="google" selectedValue={this.state.google || "0"}
                                    onChange={this.handleGoogleChange}>
                          {Radio => (
                            <div className="row generic-inputs-list">
                              <Radio value="1"/>Yes
                              <Radio value="0"/>No
                            </div>
                          )}
                        </RadioGroup>

                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-6 col-sm-6">
                        Github authentication:
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <RadioGroup name="github" selectedValue={this.state.github || "0"}
                                    onChange={this.handleGithubChange}>
                          {Radio => (
                            <div className="row generic-inputs-list">
                              <Radio value="1"/>Yes
                              <Radio value="0"/>No
                            </div>
                          )}
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-6 col-sm-6">
                        Twitter authentication:
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <RadioGroup name="twitter" selectedValue={this.state.twitter || "0"}
                                    onChange={this.handleTwitterChange}>
                          {Radio => (
                            <div className="row generic-inputs-list">
                              <Radio value="1"/>Yes
                              <Radio value="0"/>No
                            </div>
                          )}
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <br/>
                </div>

                <div className="form-panel col-xs-12 col-sm-12">
                  <div className="col-xs-12 col-sm-12 panel-heading">
                    Password Policy
                  </div>

                  <div className="col-xs-12 col-sm-8 panel-body">

                    <div className="row">
                      <div className="col-xs-6 col-sm-6">
                        <label>Minimum length</label>
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <input {...minLength} placeholder="Password minimum length" className="input-large"/>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-6 col-sm-6">
                        Require lowercase character:
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <RadioGroup name="requireLowercase"
                                    selectedValue={this.state.requireLowercase || "1"}
                                    onChange={this.handleRequireLowercaseChange}>
                          {Radio => (
                            <div className="row generic-inputs-list">
                              <Radio value="1"/>Yes
                              <Radio value="0"/>No
                            </div>
                          )}
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-6 col-sm-6">
                        Require uppercase character:
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <RadioGroup name="requireUppercase"
                                    selectedValue={this.state.requireUppercase || "0"}
                                    onChange={this.handleRequireUppercaseChange}>
                          {Radio => (
                            <div className="row generic-inputs-list">
                              <Radio value="1"/>Yes
                              <Radio value="0"/>No
                            </div>
                          )}
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-6 col-sm-6">
                        Require numeric:
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <RadioGroup name="requireNumeric"
                                    selectedValue={this.state.requireNumeric || "0"}
                                    onChange={this.handleRequireNumericChange}>
                          {Radio => (
                            <div className="row generic-inputs-list">
                              <Radio value="1"/>Yes
                              <Radio value="0"/>No
                            </div>
                          )}
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <br/>
                </div>

                <div className="form-panel col-xs-12 col-sm-12">
                  <div className="col-xs-12 col-sm-12 panel-heading">
                    User Policy
                  </div>

                  <div className="col-xs-12 col-sm-8 panel-body">

                    <div className="row">
                      <div className="col-xs-6 col-sm-6">
                        User should activate account by email:
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <RadioGroup name="activateAccount"
                                    selectedValue={this.state.activateAccount || "0"}
                                    onChange={this.handleActivateAccount}>
                          {Radio => (
                            <div className="row generic-inputs-list">
                              <Radio value="1"/>Yes
                              <Radio value="0"/>No
                            </div>
                          )}
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-6 col-sm-6">
                        Force user to change password on first login:
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <RadioGroup name="forceChangePassword"
                                    selectedValue={this.state.forceChangePassword || "0"}
                                    onChange={this.handleForceChangePassword}>
                          {Radio => (
                            <div className="row generic-inputs-list">
                              <Radio value="1"/>Yes
                              <Radio value="0"/>No
                            </div>
                          )}
                        </RadioGroup>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="row">
                  <br/>
                </div>

                <div className="form-panel col-xs-12 col-sm-12">
                  <div className="col-xs-12 col-sm-12 panel-heading">
                    Other
                  </div>

                  <div className="col-xs-12 col-sm-12 panel-body">
                    <div className="row">
                      <div className="col-xs-4 col-sm-4">
                        <label>Email templates folder</label>
                      </div>
                      <div className="col-xs-8 col-sm-8">
                        <input placeholder="Email template folder" className="input-large" {...emailTemplateFolder}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <br/>
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
    fields: fields
  },
  state => ({
    initialValues: state.settings.data ? state.settings.data : null
  }))(Settings)

export default connect((state) => {
  return {
    settings: state.settings.data ? state.settings.data : null
  }
})(Settings)
