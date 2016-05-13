'use strict'

import Request from 'superagent/lib/client'

import * as userActions from '../constants'
import {logout} from '../../auth/actions/index'

export default function closeSession (userId) {
  return (dispatch) => {
    dispatch({type: userActions.CLOSE_SESSION_REQUEST})

    Request
      .post('/api/v1/user/' + userId + '/session/close')
      .end((err, resp) => {
        if (resp.unauthorized) {
          return dispatch(logout())
        }

        if (err || !resp.body) {
          return dispatch({
            type: userActions.CLOSE_SESSION_RESPONSE,
            niceError: 'Can\'t close user session',
            hasError: true
          })
        }

        dispatch({
          type: userActions.CLOSE_SESSION_RESPONSE,
          niceError: null,
          hasError: false
        })
      })
  }
}
