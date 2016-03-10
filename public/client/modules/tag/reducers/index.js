'use strict'

import * as tagActions from '../constants'

const tagState = {
  hasError: false,
  niceError: null,
  list: null
}

export default function tag (state = tagState, action) {
  switch (action.type) {
    case tagActions.GET_TAGS_REQUEST:
      return Object.assign({}, state, {
        hasError: false,
        niceError: null,
        list: null
      })

    case tagActions.GET_TAGS_RESPONSE:
      return Object.assign({}, state, {
        hasError: action.hasError,
        niceError: action.niceError,
        list: action.list
      })

    case tagActions.SET_TAGS_REQUEST:
      return Object.assign({}, state, {
        hasError: false,
        niceError: null
      })

    case tagActions.SET_TAGS_RESPONSE:
      return Object.assign({}, state, {
        hasError: action.hasError,
        niceError: action.niceError
      })

    default:
      return state
  }
}
