'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'
import _ from 'lodash'

import * as userActions from '../constants'
import {setGroups} from '../../group/actions/index'
import {setClients} from '../../client/actions/index'

export default function upsertUser (userId, data) {
  return (dispatch, getState) => {
    let state = getState()
    dispatch({type: userActions.CREATE_USER_REQUEST})

    data.changed = data.changed || {}
    const GROUP_CHANGED = data.changed.groups || false
    const CLIENT_CHANGED = data.changed.clients || false

    const IS_REGISTER = data.register || false
    const GROUPS = data.groups
    const CLIENTS = data.clients

    data = _.omit(data, ['tagsChanged', 'register', 'groups', 'clients', 'changed'])

    doRegister({data: data, dispatch: dispatch}, function (user) {
      IS_REGISTER ? dispatch(pushPath('/')) : dispatch(pushPath('/'))
    })
  }
}

function doRegister (options, done) {
  Request
    .post('/api/v1/auth/register')
    .type('json')
    .send(options.data)
    .end((err, resp) => {
      if (err || !resp.body) {
        options.dispatch({
          type: userActions.CREATE_USER_RESPONSE,
          niceError: 'Can\'t create user',
          hasError: true,
          result: null
        })
        return done()
      }
      options.dispatch({
        type: userActions.CREATE_USER_RESPONSE,
        niceError: null,
        hasError: false,
        result: resp.body.data
      })

      return done(resp.body.data)
    })
}
