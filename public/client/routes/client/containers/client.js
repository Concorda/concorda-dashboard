'use strict'

import React from 'react'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'
import {reduxForm} from 'redux-form'
import _ from 'lodash'
import RadioGroup from 'react-radio-group'
import CheckboxGroup from 'react-checkbox-group'

import {validateEditClient} from '../../../lib/validations'

import getClient from '../../../modules/client/actions/getClient'
import upsertClient from '../../../modules/client/actions/upsertClient'
import editClient from '../../../modules/client/actions/editClient'

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
        authType: nextProps.client.authType
      })
    }
  },

  componentWillUnmount () {
  },

  handleSubmit (data) {
    const {dispatch} = this.props
    data.registerType = this.state.registerType
    data.authType = this.state.authType
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
    const { fields: {name, url, registerType, authType}, handleSubmit } = this.props
    const {client, edit} = this.props
    const {handleEditClient} = this

    return (
      <div className="page page-client container-fluid">
        <div className="row middle-xs page-heading center-xs">
          <h2 className="col-xs-12 col-sm-6">Client</h2>
        </div>

        {(() => {
          if (edit && client) {
            return (
              <form className="login-form col-xs-12 txt-left form-full-width form-panel"
                    onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <input {...name} placeholder="Name" className="input-large"/>
                    {name.error && name.touched && <div className="form-err">{name.error}</div>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <input {...url} placeholder="Url" className="input-large"/>
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
    fields: ['name', 'url', 'registerType', 'authType'],
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
