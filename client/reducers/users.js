'use strict'

import * as usersActions from '../constants/users'

const usersState = {
  isGettingUsers: false,
  isRemovingUser: false,
  niceError: null,
  hasError: true,
  result: null
}

export default function users (state = usersState, action) {
  switch (action.type) {
    case usersActions.GET_USERS_REQUEST:
      return Object.assign({}, state, {
        isGettingUsers: true,
        niceError: null,
        hasError: false,
        result: null
      })

    case usersActions.GET_USERS_RESPONSE:
      return Object.assign({}, state, {
        isGettingUsers: false,
        niceError: action.niceError,
        hasError: action.hasError,
        result: action.result
      })

    case usersActions.DELETE_USER_REQUEST:
      return Object.assign({}, state, {
        isRemovingUser: true,
        niceError: null,
        hasError: false,
        result: null
      })

    case usersActions.DELETE_USER_RESPONSE:
      return Object.assign({}, state, {
        isRemovingUser: true,
        niceError: action.niceError,
        hasError: action.hasError,
        result: action.result
      })

    default:
      return state
  }
}
