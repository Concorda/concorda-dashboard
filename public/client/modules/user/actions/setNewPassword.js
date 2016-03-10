'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as userActions from '../constants'

/**
 * This function sets a new password for a user based on reset token
 * @param data Contains the new password and repeat
 * @param token
 */
export default function setNewPassword (data, token) {
  return (dispatch) => {
    dispatch({type: userActions.SET_NEW_PASSWORD_REQUEST})
    Request
      .post('/auth/execute_reset')
      .type('form')
      .send({
        token: token,
        password: data.password,
        repeat: data.repeat
      })
      .end((err, resp) => {
        if (err || !resp.body || !resp.body.ok) {
          dispatch({
            type: userActions.SET_NEW_PASSWORD_RESPONSE,
            niceError: 'Can\'t reset password',
            hasError: true
          })
        }
        else {
          dispatch({
            type: userActions.SET_NEW_PASSWORD_RESPONSE,
            niceError: null,
            hasError: false
          })
          dispatch(pushPath('/login'))
        }
      })
  }
}
