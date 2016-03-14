'use strict'

import * as groupActions from '../constants'

const groupState = {
  hasError: false,
  niceError: null,
  list: null
}

export default function tag (state = groupState, action) {
  switch (action.type) {
    case groupActions.GET_GROUPS_REQUEST:
      return Object.assign({}, state, {
        hasError: false,
        niceError: null,
        list: null
      })

    case groupActions.GET_GROUPS_RESPONSE:
      return Object.assign({}, state, {
        hasError: action.hasError,
        niceError: action.niceError,
        list: action.list
      })

    case groupActions.SET_GROUPS_REQUEST:
      return Object.assign({}, state, {
        hasError: false,
        niceError: null
      })

    case groupActions.SET_GROUPS_RESPONSE:
      return Object.assign({}, state, {
        hasError: action.hasError,
        niceError: action.niceError
      })

    default:
      return state
  }
}
