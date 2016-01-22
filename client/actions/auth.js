'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as authActions from '../constants/auth'

export function login (user, pass) {
  return (dispatch) => {
    dispatch({type: authActions.LOGIN_REQUEST})

    Request
      .post('/auth/login')
      .type('form')
      .send({username: user, password: pass})
      .end((err, resp) => {
        if (err || !resp.body.ok) {
          dispatch({
            type: authActions.LOGIN_RESPONSE,
            niceError: 'Wrong username or password, try again',
            hasError: true,
            isLoggedIn: false
          })
        }
        else {
          dispatch({type: authActions.LOGIN_RESPONSE, hasError: false})
          dispatch(pushPath('/'))

          window.localStorage.setItem('isLoggedIn', true)
        }
      })
    }
  }

export function logout () {
  return (dispatch) => {
    dispatch({type: authActions.LOGOUT_REQUEST})

    Request
      .post('/auth/logout')
      .type('form')
      .send({})
      .end(() => {
        dispatch({type: authActions.LOGOUT_RESPONSE, hasError: false})
        dispatch(pushPath('/'))

        window.localStorage.clear()
      })
  }
}
