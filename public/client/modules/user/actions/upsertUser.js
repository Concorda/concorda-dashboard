'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'
import _ from 'lodash'

import * as userActions from '../constants'
import {setTags} from '../../tag/actions/index'

export default function upsertUser (userId, data) {
  return (dispatch, getState) => {
    let state = getState()
    dispatch({type: userActions.UPSERT_USER_REQUEST})

    const TAGS_CHANGED = data.tagsChanged || false
    const IS_REGISTER = data.register || false
    const TAGS = data.tags

    _.omit(data, ['tagsChanged', 'register', 'tags'])

    if (userId) {
      data.orig_email = state.user.editUser.email
      Request
        .put('/api/user')
        .type('form')
        .send(data)
        .end((err, resp) => {
          if (err || !resp.body) {
            dispatch({
              type: userActions.UPDATE_USER_RESPONSE,
              niceError: 'Can\'t update user',
              hasError: true,
              result: null
            })
          }
          else {
            dispatch({
              type: userActions.UPDATE_USER_RESPONSE,
              niceError: null,
              hasError: false,
              result: resp.body.data
            })

            dispatch(pushPath('/users'))
          }
        })
    }
    else {
      if (IS_REGISTER) {
        doRegister({data: data, dispatch: dispatch})
      }
      else {
        doRegister({data: data, dispatch: dispatch})
      }
    }

    if (TAGS_CHANGED) {
      // set user Tags
      dispatch(setTags(TAGS, userId))
    }

    IS_REGISTER ? dispatch(pushPath('/')) : dispatch(pushPath('/users'))
  }
}

function doRegister (options) {
  Request
    .post('/api/user')
    .type('form')
    .send(options.data)
    .end((err, resp) => {
      if (err || !resp.body) {
        options.dispatch({
          type: userActions.CREATE_USER_RESPONSE,
          niceError: 'Can\'t create user',
          hasError: true,
          result: null
        })
      }
      else {
        options.dispatch({
          type: userActions.CREATE_USER_RESPONSE,
          niceError: null,
          hasError: false,
          result: resp.body.data
        })
      }
    })
}
