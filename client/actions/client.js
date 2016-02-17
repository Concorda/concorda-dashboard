'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as clientActions from '../constants/client'

export function getClients () {
  return (dispatch) => {
    dispatch({type: clientActions.GET_CLIENTS_REQUEST})
    Request
      .get('/api/client')
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

export function getClient (clientId) {
  return (dispatch) => {
    dispatch({type: clientActions.GET_CLIENT_REQUEST})
    Request
      .get('/api/client/' + clientId)
      .end((err, resp) => {
        if (err || !resp.body) {
          dispatch({
            type: clientActions.GET_CLIENT_RESPONSE,
            niceError: 'Can\'t load client',
            hasError: true,
            details: null
          })
        }
        else {
          dispatch({
            type: clientActions.GET_CLIENT_RESPONSE,
            niceError: null,
            hasError: false,
            details: resp.body.data
          })
        }
      })
  }
}

export function deleteClient (clientId) {
  return (dispatch) => {
    dispatch({type: clientActions.DELETE_CLIENT_REQUEST})
    Request
      .delete('/api/client/' + clientId)
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
