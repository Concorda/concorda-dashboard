'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as authActions from '../constants/auth'

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

/**
 * This function performs the user logout
 *
 * @param data is of type Object and can contain a callback_url property
 */
export function logout (data) {
  return (dispatch) => {
    dispatch({type: authActions.LOGOUT_REQUEST})

    Request
      .post('/auth/logout')
      .type('form')
      .send(data)
      .end(() => {
        window.localStorage.clear()

        dispatch({type: authActions.LOGOUT_RESPONSE, hasError: false})
        dispatch(pushPath('/'))
      })
  }
}
