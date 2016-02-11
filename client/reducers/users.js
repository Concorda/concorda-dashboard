'use strict'

import * as usersActions from '../constants/users'

const usersState = {
  isGettingUsers: false,
  isRemovingUser: false,
  niceError: null,
  hasError: true,
  result: null,
  editUser: null,
  message: null
}

export default function users (state = usersState, action) {
  switch (action.type) {
    case usersActions.GET_USERS_REQUEST:
      return Object.assign({}, state, {
        isGettingUsers: true,
        isRemovingUser: false,
        niceError: null,
        hasError: false,
        result: null
      })

    case usersActions.GET_USERS_RESPONSE:
      return Object.assign({}, state, {
        isGettingUsers: false,
        isRemovingUser: false,
        niceError: action.niceError,
        hasError: action.hasError,
        result: action.result
      })

    case usersActions.DELETE_USER_REQUEST:
      return Object.assign({}, state, {
        isRemovingUser: true,
        isGettingUsers: false,
        niceError: null,
        hasError: false,
        result: null
      })

    case usersActions.DELETE_USER_RESPONSE:
      return Object.assign({}, state, {
        isRemovingUser: false,
        isGettingUsers: false,
        niceError: action.niceError,
        hasError: action.hasError,
        result: action.result
      })

    case usersActions.LOAD_USER_REQUEST:
      return Object.assign({}, state, {
        isRemovingUser: false,
        isGettingUsers: false,
        niceError: null,
        hasError: false,
        editUser: null
      })

    case usersActions.LOAD_USER_RESPONSE:
      return Object.assign({}, state, {
        isRemovingUser: false,
        isGettingUsers: false,
        niceError: action.niceError,
        hasError: action.hasError,
        editUser: action.editUser
      })

    case usersActions.PASS_RESET_REQUEST:
      return Object.assign({}, state, {
        niceError: null,
        hasError: false,
        message: null
      })

    case usersActions.PASS_RESET_RESPONSE:
      return Object.assign({}, state, {
        niceError: action.niceError,
        hasError: action.hasError,
        message: action.message
      })

    default:
      return state
  }
}
