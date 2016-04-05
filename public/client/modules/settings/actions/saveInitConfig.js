'use strict'

import Request from '../../../../../node_modules/superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as settingsActions from '../constants'

export default function saveInitConfig (data, redirectTo) {
  return (dispatch) => {
    dispatch({type: settingsActions.SAVE_INIT_CONFIG_REQUEST})
    Request
      .put('/settings')
      .type('json')
      .send(data)
      .end((err, resp) => {
        if (err || !resp.body) {
          dispatch({
            type: settingsActions.SAVE_INIT_CONFIG_RESPONSE,
            niceError: 'Can\'t update settings',
            hasError: true
          })
        }
        else {
          dispatch({
            type: settingsActions.SAVE_INIT_CONFIG_RESPONSE,
            niceError: null,
            hasError: false
          })
          redirectTo ? dispatch(pushPath(redirectTo)) : dispatch(pushPath('/'))
        }
      })
  }
}
