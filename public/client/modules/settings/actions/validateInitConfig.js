'use strict'

import Request from '../../../../../node_modules/superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as settingsActions from '../../settings/constants'

export default function validateInitConfig () {
  return (dispatch) => {
    dispatch({type: settingsActions.GET_INIT_CONF_REQUEST})
    Request
      .get('/api/v1/admin/settings')
      .end((err, resp) => {
        if (err || !resp.body) {
          dispatch({
            type: settingsActions.GET_INIT_CONF_RESPONSE,
            niceError: 'Can\'t fetch settings',
            hasError: true,
            isConfigured: false,
            data: null
          })
          return dispatch(pushPath('/login'))
        }

        const settings = resp.body.data
        dispatch({
          type: settingsActions.GET_INIT_CONF_RESPONSE,
          niceError: null,
          hasError: false,
          isConfigured: settings.configured,
          data: settings
        })

        if (!settings.configured) {
          return dispatch(pushPath('/public_init_configuration'))
        }
      })
  }
}
