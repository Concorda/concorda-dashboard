'use strict'

import React from 'react'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'
import {reduxForm} from 'redux-form'
import _ from 'lodash'
import RadioGroup from 'react-radio-group'
import CheckboxGroup from 'react-checkbox-group'

import {validateEditClient} from '../../../lib/validations'

import {getClient, upsertClient, editClient} from '../../../modules/client/actions/index'

export let Client = React.createClass({
  propTypes: {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      registerType: null,
      authType: []
    }
  },

  componentDidMount () {
    const {route, dispatch} = this.props
    if (_.endsWith(route.path, '/edit') && !this.props.edit) {
      dispatch(editClient())
    }
    dispatch(getClient(this.props.params.id))
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.client) {
      this.setState({
        registerType: nextProps.client.registerType,
        authType: nextProps.client.authType,
        appkey: nextProps.client.appkey
      })
    }
  },

  componentWillUnmount () {
  },

  handleSubmit (data) {
    const {dispatch} = this.props
    data.registerType = this.state.registerType
    data.authType = this.state.authType
    data.appkey = this.state.appkey

    dispatch(upsertClient(this.props.params.id, data))
  },

  handleEditClient () {
    const {dispatch} = this.props
    dispatch(editClient())
    dispatch(pushPath(`/client/${this.props.params.id}/edit`))
  },

  handleRegisterTypeChange (value) {
    this.setState({registerType: value})
  },

  handleAuthTypeChange: function () {
    let selectedValues = this.refs.authType.getCheckedValues()
    this.setState({authType: selectedValues})
  },

  render () {
    const { fields: {name, protocol, host, port, registerType, authType, registerWidgets, appkey, emailTemplateFolder}, handleSubmit } = this.props
    const {client, edit} = this.props
    const {handleEditClient} = this

    return (
      <div className="page page-client container-fluid">

        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Application Settings</h2>
        </div>

        {(() => {
          if (edit && client) {
            return (
              <form className="login-form col-xs-12 txt-left form-full-width form-panel"
                    onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <label>Name</label>
                    <input {...name} placeholder="Name" className="input-large"/>
                    {name.error && name.touched && <div className="form-err">{name.error}</div>}
                  </div>

                  <div className="col-xs-4 col-sm-2">
                    <label>Protocol</label>
                    <input type="text" {...protocol} placeholder="Protocol" className="input-large"/>
                    {protocol.error && protocol.touched && <div className="form-err">{protocol.error}</div>}
                  </div>
                  <div className="col-xs-4 col-sm-2">
                    <label>Host</label>
                    <input type="text" {...host} placeholder="Host" className="input-large"/>
                    {host.error && host.touched && <div className="form-err">{host.error}</div>}
                  </div>
                  <div className="col-xs-4 col-sm-2">
                    <label>Port</label>
                    <input type="text" {...port} placeholder="Port" className="input-large"/>
                    {port.error && port.touched && <div className="form-err">{port.error}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <label>Application key</label>
                    <input {...appkey} placeholder="Application key" className="input-large"/>
                  </div>

                  <div className="col-xs-12 col-sm-6">
                    <label>Widgets for user</label>
                    <input {...registerWidgets} placeholder="user widgets (comma separated)" className="input-large"/>
                    {registerWidgets.error && registerWidgets.touched && <div className="form-err">{registerWidgets.error}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <label>Email templates folder (if other than default)</label>
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
          else if (client) {
            return (
              <div className="row middle-xs center-xs">
                <div className="login-form col-xs-12 col-md-6 col-lg-4 txt-left form-full-width form-panel">
                  <div className="row">
                    <div className="col-xs-12"><p className="m0 mt"><strong>Name:</strong> {client.name}</p></div>
                    <div className="col-xs-12"><p className="m0 mt"><strong>Url:</strong> {client.url}</p></div>
                    <div className="col-xs-12"><p className="m0 mt"><strong>Register
                      Type:</strong> {client.registerType}</p></div>
                    <div className="col-xs-12"><p className="m0 mt"><strong>Authentication
                      Types:</strong> {client.authType}</p></div>
                  </div>
                  <button onClick={handleEditClient} className="btn btn-large submit">Edit</button>
                </div>
              </div>
            )
          }
        })()}
      </div>
    )
  }
})


Client = reduxForm(
  {
    form: 'editClient',
    fields: ['name', 'protocol', 'host', 'port', 'registerType', 'authType', 'appkey', 'registerWidgets', 'emailTemplateFolder'],
    validate: validateEditClient
  },
  state => ({
    initialValues: state.client.details ? state.client.details : null
  }))(Client)

export default connect((state) => {
  return {
    client: state.client.details ? state.client.details : null,
    edit: state.client.edit
  }
})(Client)
