'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as settingsActions from '../constants'

export default function getSettings () {
  return (dispatch) => {
    dispatch({type: settingsActions.GET_SETTINGS_REQUEST})
    Request
      .get('/api/v1/settings')
      .end((err, resp) => {

        if (err || !resp.body) {
          dispatch({
            type: settingsActions.GET_SETTINGS_RESPONSE,
            niceError: 'Can\'t load settings',
            hasError: true,
            data: null
          })
        }
        else {
          dispatch({
            type: settingsActions.GET_SETTINGS_RESPONSE,
            niceError: null,
            hasError: false,
            data: resp.body.data
          })
        }
      })
  }
}
