'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as clientActions from '../constants'

export default function validateInitConfig () {
  return (dispatch) => {
    dispatch({type: clientActions.GET_INIT_CONF_REQUEST})
    Request
    // HACK app name is hardcoded for now to "Concorda"
      .get('/client/Concorda')
      .end((err, resp) => {
        if (err || !resp.body) {
          dispatch({
            type: clientActions.GET_INIT_CONF_RESPONSE,
            niceError: 'Can\'t fetch client init data',
            hasError: true,
            isConfigured: false,
            configuration: null
          })
          return dispatch(pushPath('/login'))
        }

        const clientConf = resp.body.data
        dispatch({
          type: clientActions.GET_INIT_CONF_RESPONSE,
          niceError: null,
          hasError: false,
          isConfigured: clientConf.configured,
          configuration: clientConf
        })

        if (!clientConf.configured) {
          return dispatch(pushPath('/public_client_conf'))
        }
      })
  }
}
