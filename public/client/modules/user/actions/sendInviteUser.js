'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as userActions from '../constants'

/**
 * Sends and invite through email to somebody you want to join Concorda
 * @param data
 */
export default function sendInviteUser (data) {
  return (dispatch) => {
    dispatch({type: userActions.SEND_INVITE_USER_REQUEST})
    Request
      .post('/api/invite/user')
      .type('form')
      .send({
        email: data.email,
        message: data.message
      })
      .end((err, resp) => {
        if (err || !resp.body || !resp.body.ok) {
          dispatch({
            type: userActions.SEND_INVITE_USER_RESPONSE,
            niceError: 'Can\'t send invite to email',
            hasError: true
          })
        }
        else {
          dispatch({
            type: userActions.SEND_INVITE_USER_RESPONSE,
            niceError: null,
            hasError: false
          })
          dispatch(pushPath('/'))
        }
      })
  }
}
