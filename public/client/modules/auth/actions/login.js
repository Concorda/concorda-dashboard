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
export default function login (data) {
  return (dispatch) => {
    dispatch({type: authActions.LOGIN_REQUEST})

    // @hack for now
    data.appkey = 'concorda'

    Request
      .post('/auth/login')
      .type('json')
      .send(data)
      .end((err, resp) => {

        var unauthorized = false
        var niceError = 'Wrong username or password'
        if (err || resp.unauthorized) {
          unauthorized = true
        }

        if (resp.body && resp.body.ok === false){
          unauthorized = true
          if (resp.body.why){
            niceError = resp.body.why
          }
        }

        if (unauthorized){
          return dispatch({
            type: authActions.LOGIN_RESPONSE,
            niceError: niceError,
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
