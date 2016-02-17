'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as clientActions from '../constants/client'

export function getClients () {
  return (dispatch) => {
    dispatch({type: clientActions.GET_CLIENTS_REQUEST})
    dispatch({type: clientActions.GET_CLIENTS_RESPONSE})
  }
}

export function getClient () {
  return (dispatch) => {
    dispatch({type: clientActions.GET_CLIENT_REQUEST})
    dispatch({type: clientActions.GET_CLIENT_RESPONSE})
  }
}

export function deleteClient () {
  return (dispatch) => {
    dispatch({type: clientActions.DELETE_CLIENT_REQUEST})
    dispatch({type: clientActions.DELETE_CLIENT_RESPONSE})
  }
}
