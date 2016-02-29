'use strict'

import Request from 'superagent/lib/client'

import * as tagsActions from '../constants'

export default function setTags (tags, userId) {
  return (dispatch) => {
    dispatch({type: tagsActions.SET_TAGS_REQUEST})

    Request
      .post('/api/user/' + userId + '/tag')
      .type('json')
      .send({ tag: tags })
      .end((err, resp) => {
        if (err || !resp.body) {
          return dispatch({
            type: tagsActions.SET_TAGS_RESPONSE,
            niceError: 'Can\'t set tags',
            hasError: true
          })
        }

        dispatch({
          type: tagsActions.SET_TAGS_RESPONSE,
          niceError: null,
          hasError: false
        })
      })
  }
}
