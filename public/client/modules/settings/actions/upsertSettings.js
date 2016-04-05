'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as settingsActions from '../constants'

export default function upsertSettings (data) {
  return (dispatch) => {
    dispatch({type: settingsActions.UPSERT_SETTINGS_REQUEST})
    Request
      .put('/api/settings')
      .type('json')
      .send(data)
      .end((err, resp) => {
        if (err || !resp.body) {
          dispatch({
            type: settingsActions.UPSERT_SETTINGS_RESPONSE,
            niceError: 'Can\'t update settings',
            hasError: true,
            data: null
          })
        }
        else {
          dispatch({
            type: settingsActions.UPSERT_SETTINGS_RESPONSE,
            niceError: null,
            hasError: false,
            data: resp.body.data
          })
          dispatch(pushPath('/'))
        }
      })
  }
}
