'use strict'

import * as clientActions from '../constants/client'

const clientState = {
  hasError: false,
  niceError: null,
  list: null
}

export default function client (state = clientState, action) {
  switch (action.type) {
    case clientActions.GET_CLIENTS_REQUEST:
      return Object.assign({}, state, {
        hasError: false,
        niceError: null,
        list: null
      })

    case clientActions.GET_CLIENTS_RESPONSE:
      return Object.assign({}, state, {
        hasError: action.hasError,
        niceError: action.niceError,
        list: action.data
      })

    default:
      return state
  }
}
