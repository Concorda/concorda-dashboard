'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as usersActions from '../constants/users'
import * as authActionsImpl from './auth'

export function getUsers () {
  return (dispatch) => {
    dispatch({type: usersActions.GET_USERS_REQUEST})

    Request
      .get('/api/user')
      .end((err, resp) => {

        if (resp.unauthorized){
          dispatch(authActionsImpl.logout())
        }
        else if (err || !resp.body) {
          dispatch({
            type: usersActions.GET_USERS_RESPONSE,
            niceError: 'Can\'t fetch users',
            hasError: true,
            result: null
          })
        }
        else {
          dispatch({
            type: usersActions.GET_USERS_RESPONSE,
            niceError: null,
            hasError: false,
            result: resp.body.data
          })
        }
      })
  }
}

export function deleteUser (userId) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({type: usersActions.DELETE_USER_REQUEST})

    Request
      .delete('/api/user/' + userId)
      .end((err, resp) => {
        if (err || !resp.body) {
          dispatch({
            type: usersActions.DELETE_USER_RESPONSE,
            niceError: 'Can\'t delete user',
            hasError: true,
            result: null
          })
        }
        else {
          var users = state.users.result.filter(function (user) {return user.id != userId })
          dispatch({
            type: usersActions.DELETE_USER_RESPONSE,
            niceError: null,
            hasError: false,
            result: users
          })
        }
      })
  }
}
