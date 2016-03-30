'use strict'

import * as userActions from '../constants'

const usersState = {
  isGettingUsers: false,
  isRemovingUser: false,
  niceError: null,
  hasError: true,
  result: null,
  editUser: null,
  message: null,
  resetUser: null
}

export default function user (state = usersState, action) {
  switch (action.type) {
    case userActions.GET_USERS_REQUEST:
      return Object.assign({}, state, {
        isGettingUsers: true,
        isRemovingUser: false,
        niceError: null,
        hasError: false,
        result: null
      })

    case userActions.GET_USERS_RESPONSE:
      return Object.assign({}, state, {
        isGettingUsers: false,
        isRemovingUser: false,
        niceError: action.niceError,
        hasError: action.hasError,
        result: action.result
      })

    case userActions.DELETE_USER_REQUEST:
      return Object.assign({}, state, {
        isRemovingUser: true,
        isGettingUsers: false,
        niceError: null,
        hasError: false,
        result: null
      })

    case userActions.DELETE_USER_RESPONSE:
      return Object.assign({}, state, {
        isRemovingUser: false,
        isGettingUsers: false,
        niceError: action.niceError,
        hasError: action.hasError,
        result: action.result
      })

    case userActions.LOAD_USER_REQUEST:
      return Object.assign({}, state, {
        isRemovingUser: false,
        isGettingUsers: false,
        niceError: null,
        hasError: false,
        editUser: null
      })

    case userActions.LOAD_USER_RESPONSE:
      return Object.assign({}, state, {
        isRemovingUser: false,
        isGettingUsers: false,
        niceError: action.niceError,
        hasError: action.hasError,
        editUser: action.editUser
      })

    case userActions.PASS_RESET_REQUEST:
      return Object.assign({}, state, {
        niceError: null,
        hasError: false,
        message: null
      })

    case userActions.PASS_RESET_RESPONSE:
      return Object.assign({}, state, {
        niceError: action.niceError,
        hasError: action.hasError,
        message: action.message
      })

    case userActions.LOAD_PASSWORD_RESET_REQUEST:
      return Object.assign({}, state, {
        niceError: null,
        hasError: false,
        resetUser: null
      })

    case userActions.LOAD_PASSWORD_RESET_RESPONSE:
      return Object.assign({}, state, {
        niceError: action.niceError,
        hasError: action.hasError,
        resetUser: action.resetUser
      })

    case userActions.SET_NEW_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        niceError: null,
        hasError: false
      })

    case userActions.SET_NEW_PASSWORD_RESPONSE:
      return Object.assign({}, state, {
        niceError: action.niceError,
        hasError: action.hasError
      })

    case userActions.FORCE_SET_NEW_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        niceError: null,
        hasError: false
      })

    case userActions.FORCE_SET_NEW_PASSWORD_RESPONSE:
      return Object.assign({}, state, {
        niceError: action.niceError,
        hasError: action.hasError
      })

    case userActions.SEND_INVITE_USER_REQUEST:
      return Object.assign({}, state, {
        niceError: null,
        hasError: false
      })

    case userActions.SEND_INVITE_USER_RESPONSE:
      return Object.assign({}, state, {
        niceError: action.niceError,
        hasError: action.hasError
      })

    default:
      return state
  }
}
