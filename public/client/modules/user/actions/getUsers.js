'use strict'

import Request from 'superagent/lib/client'

import * as userActions from '../constants'

import {logout} from '../../auth/actions/index'

export default function getUsers () {
  return (dispatch) => {
    dispatch({type: userActions.GET_USERS_REQUEST})

    Request
      .get('/api/v1/user')
      .end((err, resp) => {
        if (resp.unauthorized) {
          return dispatch(logout())
        }

        if (err || !resp.body) {
          return dispatch({
            type: userActions.GET_USERS_RESPONSE,
            niceError: 'Can\'t fetch users',
            hasError: true,
            result: null
          })
        }

        dispatch({
          type: userActions.GET_USERS_RESPONSE,
          niceError: null,
          hasError: false,
          result: resp.body.data
        })
      })
  }
}
