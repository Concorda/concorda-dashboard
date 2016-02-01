'use strict'

import * as authActions from '../constants/auth'

const authState = {
  isLoggedIn: false,
  hasError: false,
  niceError: null,
  user: null
}

export default function auth (state = authState, action) {
  switch (action.type) {
    case authActions.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoggedIn: false,
        hasError: false,
        niceError: null,
        user: null
      })

    case authActions.LOGIN_RESPONSE:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn,
        hasError: action.hasError,
        niceError: action.niceError,
        user: action.user
      })

    case authActions.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn,
        hasError: false,
        niceError: null,
        user: action.user
      })

    case authActions.LOGOUT_RESPONSE:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn,
        hasError: action.hasError,
        niceError: action.niceError,
        user: action.user
      })

    default:
      return state
  }
}
