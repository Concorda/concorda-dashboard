'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as profileActions from '../constants'
import * as authActions from '../../auth/constants'

export default function getLoggedInUserProfile () {
  return (dispatch) => {
    dispatch({type: profileActions.GET_PROFILE_REQUEST})

    Request
      .get('/auth/user')
      .end((err, resp) => {
        if (err || !resp.body.ok) {
          if (err && err.status === 401) {
            dispatch({
              type: authActions.CHECK_COOKIE_RESPONSE,
              isLoggedIn: false
            })
            return dispatch(pushPath('/login'))
          }

          return dispatch({
            type: profileActions.GET_PROFILE_RESPONSE,
            niceError: 'Can\'t get profile data',
            hasError: true,
            data: null
          })
        }

        dispatch({
          type: profileActions.GET_PROFILE_RESPONSE,
          niceError: null,
          hasError: false,
          data: resp.body.user
        })

        dispatch(pushPath('/profile'))
      })
  }
}
