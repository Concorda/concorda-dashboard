'use strict'

import * as logsActions from '../constants'

const logsState = {
  isGettingLogs: false
}

export default function user (state = logsState, action) {
  switch (action.type) {
    case logsActions.GET_LOGS_REQUEST:
      return Object.assign({}, state, {
        isGettingLogs: true,
        niceError: null,
        hasError: false,
        result: null
      })

    case logsActions.GET_LOGS_RESPONSE:
      return Object.assign({}, state, {
        isGettingLogs: false,
        niceError: action.niceError,
        hasError: action.hasError,
        result: action.result
      })

    default:
      return state
  }
}
