'use strict'

import * as settingsActions from '../constants'

const settingsState = {
  hasError: false,
  niceError: null,
  settings: null
}

export default function settings (state = settingsState, action) {
  switch (action.type) {
    case settingsActions.GET_SETTINGS_REQUEST:
      return Object.assign({}, state, {
        hasError: false,
        niceError: null,
        data: null
      })

    case settingsActions.GET_SETTINGS_RESPONSE:
      return Object.assign({}, state, {
        hasError: action.hasError,
        niceError: action.niceError,
        data: action.data
      })

    case settingsActions.GET_INIT_CONF_REQUEST:
      return Object.assign({}, state, {
        hasError: false,
        niceError: null,
        data: null
      })

    case settingsActions.GET_INIT_CONF_RESPONSE:
      return Object.assign({}, state, {
        hasError: action.hasError,
        niceError: action.niceError,
        data: action.data
      })

    default:
      return state
  }
}
