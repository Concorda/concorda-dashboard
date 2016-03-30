'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as userActions from '../constants'

/**
 * This function sets a new password for a user
 * @param data Contains the new password and repeat
 */
export default function forceChangePassword (data) {
  return (dispatch) => {
    dispatch({type: userActions.FORCE_SET_NEW_PASSWORD_REQUEST})
    Request
      .post('/auth/change_password')
      .type('json')
      .send({
        password: data.password,
        repeat: data.repeat
      })
      .end((err, resp) => {
        if (err || !resp.body || !resp.body.ok) {
          dispatch({
            type: userActions.FORCE_SET_NEW_PASSWORD_RESPONSE,
            niceError: 'Can\'t change password',
            hasError: true
          })
        }
        else {
          dispatch({
            type: userActions.FORCE_SET_NEW_PASSWORD_RESPONSE,
            niceError: null,
            hasError: false
          })
          dispatch(pushPath('/'))
        }
      })
  }
}
