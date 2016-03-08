'use strict'

import Request from 'superagent/lib/client'

import getLoggedInUserProfile from './getLoggedInUserProfile'
import * as profileActions from '../constants'

export default function updateUserProfile (data) {
  return (dispatch, getState) => {
    let state = getState()
    dispatch({type: profileActions.UPDATE_PROFILE_REQUEST})

    data.orig_nick = state.profile.data.email
    Request
      .post('/auth/update_user')
      .type('form')
      .send(data)
      .end((err, resp) => {
        if (err || !resp.body.ok) {
          return dispatch({
            type: profileActions.UPDATE_PROFILE_RESPONSE,
            niceError: 'Can\'t update profile',
            hasError: true,
            data: null
          })
        }

        dispatch({
          type: profileActions.UPDATE_PROFILE_RESPONSE,
          niceError: null,
          hasError: false,
          data: resp.body.data
        })

        dispatch(getLoggedInUserProfile())
      })
  }
}
