'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as clientActions from '../constants/client'

export function editClient () {
  return (dispatch) => {
    dispatch({type: clientActions.EDIT_CLIENT})
  }
}

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

export function getClient (clientId, redirectTo) {
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

          if (redirectTo) {
            return dispatch(pushPath(redirectTo))
          }
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

export function upsertClient (clientId, data) {
  return (dispatch) => {
    dispatch({type: clientActions.UPSERT_CLIENT_REQUEST})
    if (clientId) {
      data.id = clientId
      Request
        .put('/api/client')
        .type('form')
        .send(data)
        .end((err, resp) => {
          if (err || !resp.body) {
            dispatch({
              type: clientActions.UPDATE_CLIENT_RESPONSE,
              niceError: 'Can\'t update client',
              hasError: true,
              result: null
            })
          }
          else {
            dispatch({
              type: clientActions.UPDATE_CLIENT_RESPONSE,
              niceError: null,
              hasError: false,
              result: resp.body.data
            })
            dispatch(editClient())
            dispatch(pushPath('/clients'))
          }
        })
    }
    else {
      Request
        .post('/api/client')
        .type('form')
        .send(data)
        .end((err, resp) => {
          if (err || !resp.body) {
            dispatch({
              type: clientActions.CREATE_CLIENT_RESPONSE,
              niceError: 'Can\'t create client',
              hasError: true,
              result: null
            })
          }
          else {
            dispatch({
              type: clientActions.CREATE_CLIENT_RESPONSE,
              niceError: null,
              hasError: false,
              result: resp.body.data
            })
            dispatch(pushPath('/clients'))
          }
        })
    }
  }
}
