
'use strict'

import React from 'react'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'

// actions
import {getClients, getClient, deleteClient} from '../actions/client'

import Panel from '../components/panel'

export const Clients = React.createClass({
  componentDidMount () {
    this.props.dispatch(getClients())
  },

  handleAdd () {
    this.props.dispatch(pushPath('/client/add'))
  },

  handleEdit (clientId) {
    this.props.dispatch(getUser(clientId, `/client/${clientId}/edit`))
  },

  handleDelete (clientId) {
    this.props.dispatch(deleteUser(clientId))
  },

  render () {
    const {clients} = this.props
    let body = null

    if (clients) {
      body = (
        <div className="client-list">
          <div className="client-list-heading cf row">
            <div className="col-xs-12 col-md-3"><h4 className="m0">Name</h4></div>
            <div className="col-xs-12 col-md-3"><h4 className="m0">Description</h4></div>
            <div className="col-xs-12 col-md-3"><h4 className="m0">Active</h4></div>
            <div className="col-xs-12 col-md-6"><h4 className="m0">Actions</h4></div>
          </div>

          {clients.map((client) => {
            return (
              <div key={client.id} className="user-list-row row cf">
                <div className="col-xs-12 col-md-3">{client.name}</div>
                <div className="col-xs-12 col-md-3">{client.description}</div>
                <div className="col-xs-12 col-md-3">{client.active}</div>
                <div className="col-xs-12 col-md-6">
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
          <h2 className="col-xs-6 col-sm-6">External Clients</h2>
          <div className="col-xs-6 col-sm-6 txt-right">
            <button onClick={() => { this.handleAdd() }} className="btn btn-primary">Add Client</button>
          </div>
        </div>

        <div className="row middle-xs search-wrapper">
          <div className="col-xs-12 col-sm-8 col-md-8 search-input-wrapper">
            <input type="search" className="input-large" placeholder="Find a client"/>
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

        <Panel title={'Client List'}>
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
  return {
    clients: state.client.list
  }
})(Clients)
