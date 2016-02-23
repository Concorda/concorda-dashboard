'use strict'

import * as clientActions from '../constants/client'

const clientState = {
  hasError: false,
  niceError: null,
  isRemovingClient: false,
  edit: false,
  list: null,
  details: null,
  isConfigured: false,
  configuration: null
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
        list: action.list
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

    case clientActions.EDIT_CLIENT:
      return Object.assign({}, state, {
        edit: !state.edit
      })

    case clientActions.GET_INIT_CONF_REQUEST:
      return Object.assign({}, state, {
        niceError: null,
        hasError: false,
        isConfigured: false,
        configuration: null
      })

    case clientActions.GET_INIT_CONF_RESPONSE:
      return Object.assign({}, state, {
        niceError: action.niceError,
        hasError: action.hasError,
        isConfigured: action.isConfigured,
        configuration: action.configuration
      })

    case clientActions.SAVE_INIT_CONFIG_REQUEST:
      return Object.assign({}, state, {
        niceError: null,
        hasError: false
      })

    case clientActions.SAVE_INIT_CONFIG_RESPONSE:
      return Object.assign({}, state, {
        niceError: action.niceError,
        hasError: action.hasError
      })

    default:
      return state
  }
}
