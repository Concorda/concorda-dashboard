'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import RadioGroup from 'react-radio-group'
import CheckboxGroup from 'react-checkbox-group'

import {upsertClient} from '../../../modules/client/actions/index'

import {validateAddClient} from '../../../lib/validations'

export let AddClient = React.createClass({
  propTypes: {
    handleSubmit: React.PropTypes.func.isRequired
  },
  getInitialState () {
    return {
      registerType: 'closed',
      authType: [],
      appkey: null,
      registerWidgets: ""
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
    const { fields: {name, protocol,host, port, registerType, authType, appkey, registerWidgets}, handleSubmit } = this.props

    return (
      <div className="page container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Add Application</h2>
        </div>

        <form className="login-form col-xs-12 txt-left form-full-width form-panel"
              onSubmit={handleSubmit(this.createClient)}>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <label>Name</label>
              <input type="text" {...name} placeholder="Name" className="input-large"/>
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
      </div>
    )
  }
})

AddClient = reduxForm({
  form: 'addClient',
  fields: ['name', 'protocol', 'host', 'port', 'registerType', 'authType', 'appkey', 'registerWidgets'],
  validate: validateAddClient
})(AddClient)

export default connect((state, ownProps) => {
  return {
  }
})(AddClient)
