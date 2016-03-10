'use strict'

import Request from 'superagent/lib/client'

import * as userActions from '../constants'

/**
 * This function loads the user details using reset token
 * @param token
 */
export default function loadPasswordResetUser (token) {
  return (dispatch) => {
    dispatch({type: userActions.LOAD_PASSWORD_RESET_REQUEST})
    Request
      .post('/auth/load_reset')
      .type('form')
      .send({token: token})
      .end((err, resp) => {
        if (err || !resp.body || !resp.body.ok) {
          dispatch({
            type: userActions.LOAD_PASSWORD_RESET_RESPONSE,
            niceError: 'Can\'t load reset password informations for this token',
            hasError: true,
            resetUser: null
          })
        }
        else {
          dispatch({
            type: userActions.LOAD_PASSWORD_RESET_RESPONSE,
            niceError: null,
            hasError: false,
            resetUser: resp.body
          })
        }
      })
  }
}
