'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as clientActions from '../constants'

export default function getClient (clientId, redirectTo) {
  return (dispatch) => {
    dispatch({type: clientActions.GET_CLIENT_REQUEST})
    Request
      .get('/api/v1/client/' + clientId)
      .end((err, resp) => {
        if (err || !resp.body) {
          dispatch({
            type: clientActions.GET_CLIENT_RESPONSE,
            niceError: 'Can\'t load client',
            hasError: true,
            details: null
          })
        }
        else {
          dispatch({
            type: clientActions.GET_CLIENT_RESPONSE,
            niceError: null,
            hasError: false,
            details: resp.body.data
          })

          if (redirectTo) {
            return dispatch(pushPath(redirectTo))
          }
        }
      })
  }
}
