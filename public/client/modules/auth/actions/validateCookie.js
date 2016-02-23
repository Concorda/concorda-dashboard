'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'
import * as authActions from '../constants'

export function validateCookie (redirectUrl) {
  return (dispatch) => {
    dispatch({type: authActions.CHECK_COOKIE_REQUEST})

    Request
      .get('/auth/user')
      .end((err, resp) => {
        if (err && err.status === 401 || !resp.body || resp.body.statusCode === 401) {
          dispatch({
            type: authActions.CHECK_COOKIE_RESPONSE,
            isLoggedIn: false
          })

          return dispatch(pushPath('/login'))
        }

        dispatch({
          type: authActions.CHECK_COOKIE_RESPONSE,
          isLoggedIn: true
        })

        if (redirectUrl) {
          return dispatch(pushPath(redirectUrl))
        }

        dispatch(pushPath('/'))
      })
  }
}
