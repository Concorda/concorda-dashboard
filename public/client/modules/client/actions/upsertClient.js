'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'
import editClient from './editClient'

import * as clientActions from '../constants'

export default function upsertClient (clientId, data) {
  return (dispatch) => {
    dispatch({type: clientActions.UPSERT_CLIENT_REQUEST})
    if (clientId) {
      data.id = clientId
      Request
        .put('/api/client')
        .type('json')
        .send(data)
        .end((err, resp) => {
          if (err || !resp.body) {
            dispatch({
              type: clientActions.UPDATE_CLIENT_RESPONSE,
              niceError: 'Can\'t update client',
              hasError: true,
              result: null
            })
          }
          else {
            dispatch({
              type: clientActions.UPDATE_CLIENT_RESPONSE,
              niceError: null,
              hasError: false,
              result: resp.body.data
            })
            dispatch(editClient())
            dispatch(pushPath('/clients'))
          }
        })
    }
    else {
      Request
        .post('/api/client')
        .type('json')
        .send(data)
        .end((err, resp) => {
          if (err || !resp.body) {
            dispatch({
              type: clientActions.CREATE_CLIENT_RESPONSE,
              niceError: 'Can\'t create client',
              hasError: true,
              result: null
            })
          }
          else {
            dispatch({
              type: clientActions.CREATE_CLIENT_RESPONSE,
              niceError: null,
              hasError: false,
              result: resp.body.data
            })
            dispatch(pushPath('/clients'))
          }
        })
    }
  }
}
