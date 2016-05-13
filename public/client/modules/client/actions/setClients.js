'use strict'

import Request from 'superagent/lib/client'

import * as clientsActions from '../constants'

export default function setClients (clients, userId) {
  return (dispatch) => {
    dispatch({type: clientsActions.SET_GROUPS_REQUEST})

    Request
      .post('/api/v1/user/' + userId + '/clients')
      .type('json')
      .send({ clients: clients })
      .end((err, resp) => {
        if (err || !resp.body) {
          return dispatch({
            type: clientsActions.SET_GROUPS_RESPONSE,
            niceError: 'Can\'t set clients',
            hasError: true
          })
        }

        dispatch({
          type: clientsActions.SET_GROUPS_RESPONSE,
          niceError: null,
          hasError: false
        })
      })
  }
}
