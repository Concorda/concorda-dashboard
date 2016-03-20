'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'
import _ from 'lodash'

import * as userActions from '../constants'

export default function getUser (userId, redirectTo) {
  return (dispatch) => {
    dispatch({type: userActions.LOAD_USER_REQUEST})

    Request
      .get('/api/user/' + userId)
      .end((err, resp) => {
        if (err || !resp.body) {
          dispatch({
            type: userActions.LOAD_USER_RESPONSE,
            niceError: 'Can\'t load user',
            hasError: true,
            editUser: null
          })
        }
        else {
          let userDetails = resp.body.data

          userDetails.groups = _.map(userDetails.groups, function (group) {
            return _.assign(_.omit(group, ['id', 'userId', 'tagId', 'tagName']), {id: group.id, text: group.name})
          })

          dispatch({
            type: userActions.LOAD_USER_RESPONSE,
            niceError: null,
            hasError: false,
            editUser: userDetails
          })

          if (redirectTo) {
            return dispatch(pushPath(redirectTo))
          }
        }
      })
  }
}
