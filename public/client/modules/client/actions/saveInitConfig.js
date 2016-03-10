'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as clientActions from '../constants'

export default function saveInitConfig (clientId, data, redirectTo) {
  return (dispatch) => {
    dispatch({type: clientActions.SAVE_INIT_CONFIG_REQUEST})
    data.id = clientId
    Request
      .put('/client')
      .type('form')
      .send(data)
      .end((err, resp) => {
        if (err || !resp.body) {
          dispatch({
            type: clientActions.SAVE_INIT_CONFIG_RESPONSE,
            niceError: 'Can\'t update client',
            hasError: true
          })
        }
        else {
          dispatch({
            type: clientActions.SAVE_INIT_CONFIG_RESPONSE,
            niceError: null,
            hasError: false
          })
          redirectTo ? dispatch(pushPath(redirectTo)) : dispatch(pushPath('/clients'))
        }
      })
  }
}
