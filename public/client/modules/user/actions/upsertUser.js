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

    data = _.omit(data, ['tagsChanged', 'register', 'tags'])

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

            if (TAGS_CHANGED) {
              // set user Tags
              dispatch(setTags(TAGS, userId))
            }
            IS_REGISTER ? dispatch(pushPath('/')) : dispatch(pushPath('/users'))
          }
        })
    }
    else {
      doRegister({data: data, dispatch: dispatch}, function (user) {
        if (TAGS_CHANGED) {
          // set user Tags
          dispatch(setTags(TAGS, user.id))
        }
        IS_REGISTER ? dispatch(pushPath('/')) : dispatch(pushPath('/users'))
      })
    }
  }
}

function doRegister (options, done) {
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
