'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as authActions from '../constants'

/**
 * This function performs the user logout
 *
 * @param data is of type Object and can contain a callback_url property
 */
export default function logout (data) {
  return (dispatch) => {
    dispatch({type: authActions.LOGOUT_REQUEST})

    Request
      .post('/api/v1/auth/logout')
      .type('form')
      .send(data)
      .end(() => {
        window.localStorage.clear()

        dispatch({type: authActions.LOGOUT_RESPONSE, hasError: false})
        dispatch(pushPath('/'))
      })
  }
}
