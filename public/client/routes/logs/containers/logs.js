'use strict'

import React from 'react'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'
import _ from 'lodash'

// actions
import {getLogs} from '../../../modules/logs/actions/index'

import Panel from '../../components/panel'

export const Logs = React.createClass({
  componentDidMount () {
    this.props.dispatch(getLogs())
  },

  render () {
    const {logs} = this.props
    let body = null

    if (logs) {
      body = (
        <div className="user-list">
          <div className="user-list-heading cf row">
            <div className="col-xs-12 col-md-2"><h4 className="m0">Action</h4></div>
            <div className="col-xs-12 col-md-2"><h4 className="m0">Date</h4></div>
            <div className="col-xs-2 col-md-2"><h4 className="m0">Status</h4></div>
            <div className="col-xs-2 col-md-4"><h4 className="m0">Author</h4></div>
            <div className="col-xs-2 col-md-2"><h4 className="m0">Remote IP address</h4></div>
          </div>

          {logs.map((log) => {
            return (
              <div key={log.id} className="user-list-row row cf">
                <div className="col-xs-12 col-md-2">{log.actionType}</div>
                <div className="col-xs-12 col-md-2">{log.actionDate}</div>
                <div className="col-xs-12 col-md-2">{log.status}</div>
                <div className="col-xs-12 col-md-4">{log.userData ? log.userData.name : 'N/A'}</div>
                <div className="col-xs-12 col-md-2">{log.remoteAddress}</div>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div className="page page-users container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-6 col-sm-6">Action Logs</h2>
        </div>

        <div className="row middle-xs search-wrapper">
          <div className="col-xs-12 col-sm-8 col-md-8 search-input-wrapper">
            <ul className="list-unstyled search-dropdown-active">
              <li><a href="">Item one</a></li>
              <li><a href="">Item two</a></li>
              <li><a href="">Item three</a></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 txt-left">
            <button className="btn btn-large btn-search">Search</button>
          </div>
        </div>

        <Panel title={'Log List'}>
          {body}
        </Panel>

        <nav role="navigation" className="txt-center">
          <ul className="list-unstyled list-inline pagination">
            <li><a href="">Prev</a></li>
            <li><a href="">1</a></li>
            <li><a href="" className="page-current">2</a></li>
            <li><a href="">3</a></li>
            <li><a href="" className="page-unavailable">Next</a></li>
          </ul>
        </nav>

      </div>
    )
  }
})

export default connect((state) => {
  console.log('>>>>>>>>>>>>', state)
  return {
    logs:  state.logs ? state.logs.result : null
  }
})(Logs)
