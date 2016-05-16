'use strict'

import Request from 'superagent/lib/client'
import getClients from './getClients'

import * as clientActions from '../constants'

export default function deleteClient (clientId) {
  return (dispatch) => {
    dispatch({type: clientActions.DELETE_CLIENT_REQUEST})
    Request
      .delete('/api/v1/admin/client/' + clientId)
      .end((err, resp) => {
        if (err || !resp.body) {
          return dispatch({
            type: clientActions.DELETE_CLIENT_RESPONSE,
            niceError: 'Can\'t delete client',
            hasError: true
          })
        }

        dispatch({
          type: clientActions.DELETE_CLIENT_RESPONSE,
          niceError: null,
          hasError: false
        })

        dispatch(getClients())
      })
  }
}
