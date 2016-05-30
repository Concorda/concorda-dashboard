'use strict'

import Request from 'superagent/lib/client'

import * as logsActions from '../constants'

import {logout} from '../../auth/actions/index'

export default function getLogs () {
  return (dispatch) => {
    dispatch({type: logsActions.GET_LOGS_REQUEST})

    Request
      .get('/api/v1/admin/logs')
      .end((err, resp) => {
        if (resp.unauthorized) {
          return dispatch(logout())
        }

        if (err || !resp.body) {
          return dispatch({
            type: logsActions.GET_LOGS_RESPONSE,
            niceError: 'Can\'t fetch logs',
            hasError: true,
            result: null
          })
        }

        dispatch({
          type: logsActions.GET_LOGS_RESPONSE,
          niceError: null,
          hasError: false,
          result: resp.body.data
        })
      })
  }
}
