'use strict'

import Request from 'superagent/lib/client'

import * as clientActions from '../constants'

export default function getClients () {
  return (dispatch) => {
    dispatch({type: clientActions.GET_CLIENTS_REQUEST})
    Request
      .get('/api/v1/client')
      .end((err, resp) => {
        if (err || !resp.body) {
          return dispatch({
            type: clientActions.GET_CLIENTS_RESPONSE,
            niceError: 'Can\'t fetch clients',
            hasError: true,
            list: null
          })
        }

        dispatch({
          type: clientActions.GET_CLIENTS_RESPONSE,
          niceError: null,
          hasError: false,
          list: resp.body.data
        })
      })
  }
}
