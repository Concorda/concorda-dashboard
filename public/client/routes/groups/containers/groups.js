'use strict'

import React from 'react'
import {connect} from 'react-redux'
import { pushPath } from 'redux-simple-router'
import _ from 'lodash'

// actions
import {getGroups/*, deleteGroups, getGroup*/} from '../../../modules/group/actions/index'

import Panel from '../../components/panel'

export const Groups = React.createClass({
  componentDidMount () {
    this.props.dispatch(getGroups())
  },

  handleAdd () {
    this.props.dispatch(pushPath('/group/add'))
  },

  handleEdit (groupId) {
    this.props.dispatch(getGroup(groupId, `/group/${groupId}/edit`))
  },

  handleDelete (id) {
    this.props.dispatch(deleteGroup(id))
  },

  render () {
    const {groups} = this.props
    let body = null

    if (groups) {
      body = (
        <div className="user-list">
          <div className="user-list-heading cf row">
            <div className="col-xs-12 col-md-2"><h4 className="m0">Name</h4></div>
          </div>

          {groups.map((group) => {
            return (
              <div key={group.id} className="user-list-row row cf">
                <div className="col-xs-12 col-md-2">{group.name}</div>
                <div className="col-xs-12 col-md-4">
                  <ul className="list-unstyled list-inline">
                    <li><a onClick={() => { this.handleEdit(user.id) }}>Edit</a></li>
                    <li><a onClick={() => { this.handleDelete(user.id) }}>Delete</a></li>
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
          <h2 className="col-xs-6 col-sm-6">Groups</h2>
          <div className="col-xs-6 col-sm-6 txt-right">
            <button onClick={() => { this.handleAdd() }} className="btn btn-primary">Add Group</button>
          </div>
        </div>

        <Panel title={'Group List'}>
          {body}
        </Panel>

      </div>
    )
  }
})

export default connect((state) => {
  return {
    groups: state.group.list
  }
})(Groups)
