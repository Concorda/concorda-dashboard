'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as authActions from '../constants'

/**
 * This function performs  the login
 *
 * @param data Must be an object of the following form:
 * { username: <username>, password: <password>, callback_url:<callback_url> }
 * the callback_url property is optional
 */
export function login (data) {
  return (dispatch) => {
    dispatch({type: authActions.LOGIN_REQUEST})

    Request
      .post('/auth/login')
      .type('form')
      .send(data)
      .end((err, resp) => {
        if (err || resp.unauthorized) {
          return dispatch({
            type: authActions.LOGIN_RESPONSE,
            niceError: 'Wrong username or password',
            hasError: true,
            isLoggedIn: false
          })
        }
        window.localStorage.setItem('isLoggedIn', true)

        dispatch({
          type: authActions.LOGIN_RESPONSE,
          isLoggedIn: true,
          hasError: false
        })

        dispatch(pushPath('/'))
      })
  }
}
