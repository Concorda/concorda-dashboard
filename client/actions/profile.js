'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as profileActions from '../constants/profile'

export function editProfile () {
  return (dispatch) => {
    dispatch({type: profileActions.EDIT_PROFILE})
  }
}

export function getLoggedInUserProfile () {
  return (dispatch) => {
    dispatch({type: profileActions.GET_PROFILE_REQUEST})

    Request
      .get('/auth/user')
      .end((err, resp) => {
        if (err || !resp.body.ok) {
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

export function updateUserProfile (userId, data) {
  return (dispatch, getState) => {
    let state = getState()
    dispatch({type: profileActions.UPDATE_PROFILE_REQUEST})

    data.orig_email = state.profile.data.email
    Request
      .put('/api/user')
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

        dispatch(pushPath('/profile'))
      })
  }
}
