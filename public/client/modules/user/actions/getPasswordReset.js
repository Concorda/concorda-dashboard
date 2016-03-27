'use strict'

import Request from 'superagent/lib/client'

import * as userActions from '../constants'

/**
 * Generates a reset password for a given email address
 * @param data
 */
export default function getPasswordReset (data) {
  return (dispatch) => {
    dispatch({type: userActions.PASS_RESET_REQUEST})
    Request
      .post('/auth/create_reset')
      .type('json')
      .send({email: data.email, appkey: 'concorda'})// @hack - appkey is set hardcoded here
      .end((err, resp) => {
        if (err || !resp.body.ok) {
          dispatch({
            type: userActions.PASS_RESET_RESPONSE,
            niceError: resp.body.why || 'Can\'t find user with email: ' + data.email,
            hasError: true,
            message: null
          })
        }
        else {
          dispatch({
            type: userActions.PASS_RESET_RESPONSE,
            niceError: null,
            hasError: false,
            message: 'Check your email for a link to reset your password. If it doesn\'t appear within a few minutes, check your spam folder.'
          })
        }
      })
  }
}
