'use strict'

import React from 'react'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'

// actions
import {getUsers, deleteUser, getUser, closeSession} from '../actions/users'

import Panel from '../components/panel'

export const Users = React.createClass({
  componentDidMount () {
    this.props.dispatch(getUsers())
  },

  handleAdd () {
    this.props.dispatch(pushPath('user/add'))
  },

  handleEdit(userId){
    this.props.dispatch(getUser(userId, `user/${userId}/edit`))
  },

  handleDelete (id) {
    this.props.dispatch(deleteUser(id))
  },

  handleCloseSession (id) {
    this.props.dispatch(closeSession(id))
  },

  render () {
    const {users} = this.props
    let body = null

    if (users) {
      body = (
        <div className="user-list">
            <div className="user-list-heading cf row">
              <div className="col-xs-12 col-md-3"><h4 className="m0">Name</h4></div>
              <div className="col-xs-12 col-md-3"><h4 className="m0">Email</h4></div>
              <div className="col-xs-12 col-md-6"><h4 className="m0">Actions</h4></div>
            </div>

            {users.map((user) => {
              return (
                <div key={user.id} className="user-list-row row cf">
                  <div className="col-xs-12 col-md-3">{user.name}</div>
                  <div className="col-xs-12 col-md-3">{user.email}</div>
                  <div className="col-xs-12 col-md-6">
                    <ul className="list-unstyled list-inline">
                      <li><a onClick={() => {this.handleEdit(user.id)}}>Edit</a></li>
                      <li><a onClick={() => {this.handleDelete(user.id)}}>Delete</a></li>
                      <li><a onClick={() => {this.handleCloseSession(user.id)}}>Close Session</a></li>
                    </ul>  
                  </div>
                </div>
              )
            })}
        </div>
      )
    }

    return (
      <div className="page page-users container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-4 col-sm-6">Users</h2>
          <div className="col-xs-8 col-sm-6 txt-right">
            <button onClick={(e) => {this.handleAdd()}} className="btn">Add User</button>
          </div>
        </div>
        
        <div className="row middle-xs search-wrapper">
          <div className="col-xs-12 col-sm-8 col-md-8 search-input-wrapper">
            <input type="search" className="input-large" placeholder="Find a user" />
            <ul className="list-unstyled search-dropdown-active">
              <li><a href="">Item one</a></li>
              <li><a href="">Item two</a></li>
              <li><a href="">Item three</a></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 txt-left">
            <button className="btn btn-primary btn-large btn-search">Search</button>
          </div>
        </div>
        
        <Panel title={'User List'}>
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
    users: state.users.result
  }
})(Users)
