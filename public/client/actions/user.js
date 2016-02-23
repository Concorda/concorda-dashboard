'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'
import _ from 'lodash'

import * as userActions from '../constants/user'
import {logout} from '../modules/auth/actions/logout'

export function getUsers () {
  return (dispatch) => {
    dispatch({type: userActions.GET_USERS_REQUEST})

    Request
      .get('/api/user')
      .end((err, resp) => {
        if (resp.unauthorized) {
          return dispatch(logout())
        }

        if (err || !resp.body) {
          return dispatch({
            type: userActions.GET_USERS_RESPONSE,
            niceError: 'Can\'t fetch users',
            hasError: true,
            result: null
          })
        }

        dispatch({
          type: userActions.GET_USERS_RESPONSE,
          niceError: null,
          hasError: false,
          result: resp.body.data
        })
      })
  }
}

export function deleteUser (userId) {
  return (dispatch) => {
    dispatch({type: userActions.DELETE_USER_REQUEST})

    Request
      .delete('/api/user/' + userId)
      .end((err, resp) => {
        if (resp.unauthorized) {
          return dispatch(logout())
        }

        if (err || !resp.body) {
          return dispatch({
            type: userActions.DELETE_USER_RESPONSE,
            niceError: 'Can\'t delete user',
            hasError: true
          })
        }

        dispatch({
          type: userActions.DELETE_USER_RESPONSE,
          niceError: null,
          hasError: false
        })

        dispatch(getUsers())
      })
  }
}

export function closeSession (userId) {
  return (dispatch) => {
    dispatch({type: userActions.CLOSE_SESSION_REQUEST})

    Request
      .post('/api/user/' + userId + '/session/close')
      .end((err, resp) => {
        if (resp.unauthorized) {
          return dispatch(logout())
        }

        if (err || !resp.body) {
          return dispatch({
            type: userActions.CLOSE_SESSION_RESPONSE,
            niceError: 'Can\'t close user session',
            hasError: true
          })
        }

        dispatch({
          type: userActions.CLOSE_SESSION_RESPONSE,
          niceError: null,
          hasError: false
        })
      })
  }
}

export function getUser (userId, redirectTo) {
  return (dispatch) => {
    dispatch({type: userActions.LOAD_USER_REQUEST})

    Request
      .get('/api/user/' + userId)
      .end((err, resp) => {
        if (err || !resp.body) {
          dispatch({
            type: userActions.LOAD_USER_RESPONSE,
            niceError: 'Can\'t load user',
            hasError: true,
            editUser: null
          })
        }
        else {
          dispatch({
            type: userActions.LOAD_USER_RESPONSE,
            niceError: null,
            hasError: false,
            editUser: resp.body.data
          })

          if (redirectTo) {
            return dispatch(pushPath(redirectTo))
          }
        }
      })
  }
}

export function upsertUser (userId, data) {
  return (dispatch, getState) => {
    let state = getState()
    dispatch({type: userActions.UPSERT_USER_REQUEST})

    if (userId) {
      data.orig_email = state.user.editUser.email
      Request
        .put('/api/user')
        .type('form')
        .send(data)
        .end((err, resp) => {
          if (err || !resp.body) {
            dispatch({
              type: userActions.UPDATE_USER_RESPONSE,
              niceError: 'Can\'t update user',
              hasError: true,
              result: null
            })
          }
          else {
            dispatch({
              type: userActions.UPDATE_USER_RESPONSE,
              niceError: null,
              hasError: false,
              result: resp.body.data
            })

            dispatch(pushPath('/users'))
          }
        })
    }
    else {
      if (data.register) {
        _.omit(data, ['register'])
        Request
          .post('/auth/register')
          .type('form')
          .send(data)
          .end((err, resp) => {
            if (err || !resp.body) {
              dispatch({
                type: userActions.CREATE_USER_RESPONSE,
                niceError: 'Can\'t create user',
                hasError: true,
                result: null
              })
            }
            else {
              dispatch({
                type: userActions.CREATE_USER_RESPONSE,
                niceError: null,
                hasError: false,
                result: resp.body.data
              })
              dispatch(pushPath('/'))
            }
          })
      }
      else {
        Request
          .post('/api/user')
          .type('form')
          .send(data)
          .end((err, resp) => {
            if (err || !resp.body) {
              dispatch({
                type: userActions.CREATE_USER_RESPONSE,
                niceError: 'Can\'t create user',
                hasError: true,
                result: null
              })
            }
            else {
              dispatch({
                type: userActions.CREATE_USER_RESPONSE,
                niceError: null,
                hasError: false,
                result: resp.body.data
              })
              dispatch(pushPath('/users'))
            }
          })
      }
    }
  }
}

/**
 * Generates a reset password for a given email address
 * @param data
 */
export function getPasswordReset (data) {
  return (dispatch) => {
    dispatch({type: userActions.PASS_RESET_REQUEST})
    Request
      .post('/auth/create_reset')
      .type('form')
      .send({email: data.email})
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

/**
 * This function loads the user details using reset token
 * @param token
 */
export function loadPasswordResetUser (token) {
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

/**
 * This function sets a new password for a user based on reset token
 * @param data Contains the new password and repeat
 * @param token
 */
export function setNewPassword (data, token) {
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

/**
 * Sends and invite through email to somebody you want to join Concorda
 * @param data
 */
export function sendInviteUser (data) {
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
