'use strict'

import Request from 'superagent/lib/client'

import * as userActions from '../constants'
import {logout} from '../../auth/actions/index'
import {getUsers} from './index'

export default function deleteUser (userId) {
  return (dispatch) => {
    dispatch({type: userActions.DISABLE_USER_REQUEST})

    Request
      .post('/api/v1/admin/user/' + userId + '/disable')
      .end((err, resp) => {
        if (resp.unauthorized) {
          return dispatch(logout())
        }

        if (err || !resp.body) {
          return dispatch({
            type: userActions.DISABLE_USER_RESPONSE,
            niceError: 'Can\'t enable user',
            hasError: true
          })
        }

        dispatch({
          type: userActions.DISABLE_USER_RESPONSE,
          niceError: null,
          hasError: false
        })

        dispatch(getUsers())
      })
  }
}
