'use strict'

import React from 'react'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'

// actions
import {deleteClient, getClient, getClients, editClient} from '../../../modules/client/actions/index'

import Panel from '../../components/panel'

export const Clients = React.createClass({
  componentDidMount () {
    this.props.dispatch(getClients())
  },

  handleAdd () {
    this.props.dispatch(pushPath('/client/add/new'))
  },

  handleView (clientId) {
    const {dispatch} = this.props
    dispatch(pushPath(`/client/${clientId}/view`))
  },

  handleEdit (clientId) {
    const {dispatch} = this.props
    dispatch(editClient())
    dispatch(getClient(clientId, `/client/${clientId}/edit`))
  },

  handleDelete (clientId) {
    this.props.dispatch(deleteClient(clientId))
  },

  render () {
    const {clients} = this.props
    let body = null

    if (clients) {
      body = (
        <div className="user-list">
          <div className="user-list-heading cf row">
            <div className="col-xs-12 col-md-3"><h4 className="m0">Name</h4></div>
            <div className="col-xs-12 col-md-6"><h4 className="m0">Url</h4></div>
            <div className="col-xs-12 col-md-3"><h4 className="m0">Actions</h4></div>
          </div>

          {clients.map((client) => {
            return (
              <div key={client.id} className="user-list-row row cf">
                <div className="col-xs-12 col-md-3"><a className="no-href" onClick={() => { this.handleView(client.id) }}>{client.name}</a>
                </div>
                <div className="col-xs-12 col-md-6"><a className="no-href">{client.protocol && client.host && client.port ? client.protocol + '://' + client.host  + ':' + client.port : 'N/A'}</a>
                </div>
                <div className="col-xs-12 col-md-3">
                  <ul className="list-unstyled list-inline">
                    <li><a onClick={() => { this.handleEdit(client.id) }}>Edit</a></li>
                    <li><a onClick={() => { this.handleDelete(client.id) }}>Delete</a></li>
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div className="page page-clients container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-6 col-sm-6">Applications</h2>
          <div className="col-xs-6 col-sm-6 txt-right">
            <button onClick={() => { this.handleAdd() }} className="btn btn-primary">Add Application</button>
          </div>
        </div>

        <Panel title={'Application List'}>
          {body}
        </Panel>

      </div>
    )
  }
})

export default connect((state) => {
  return {
    clients: state.client.list
  }
})(Clients)
