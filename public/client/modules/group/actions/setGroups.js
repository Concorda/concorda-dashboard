'use strict'

import Request from 'superagent/lib/client'

import * as groupsActions from '../constants'

export default function setTags (groups, userId) {
  return (dispatch) => {
    dispatch({type: groupsActions.SET_GROUPS_REQUEST})

    Request
      .post('/api/user/' + userId + '/tag')
      .type('json')
      .send({ tag: groups })
      .end((err, resp) => {
        if (err || !resp.body) {
          return dispatch({
            type: groupsActions.SET_GROUPS_RESPONSE,
            niceError: 'Can\'t set groups',
            hasError: true
          })
        }

        dispatch({
          type: groupsActions.SET_GROUPS_RESPONSE,
          niceError: null,
          hasError: false
        })
      })
  }
}
