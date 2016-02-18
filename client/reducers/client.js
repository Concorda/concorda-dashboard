'use strict'

import * as clientActions from '../constants/client'

const clientState = {
  hasError: false,
  niceError: null,
  isRemovingClient: false,
  list: null,
  details: null
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

    case clientActions.DELETE_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isRemovingClient: true,
        niceError: null,
        hasError: false,
        list: null
      })

    case clientActions.DELETE_CLIENT_RESPONSE:
      return Object.assign({}, state, {
        isRemovingClient: false,
        niceError: action.niceError,
        hasError: action.hasError,
        list: action.list
      })

    case clientActions.GET_CLIENT_REQUEST:
      return Object.assign({}, state, {
        niceError: null,
        hasError: false,
        details: null
      })

    case clientActions.GET_CLIENT_RESPONSE:
      return Object.assign({}, state, {
        niceError: action.niceError,
        hasError: action.hasError,
        details: action.details
      })

    default:
      return state
  }
}
