'use strict'

import Request from 'superagent/lib/client'
import _ from 'lodash'

import * as tagsActions from '../constants'

export default function getTags () {
  return (dispatch) => {
    dispatch({type: tagsActions.GET_TAGS_REQUEST})

    Request
      .get('/api/tag')
      .end((err, resp) => {
        if (err || !resp.body) {
          return dispatch({
            type: tagsActions.GET_TAGS_RESPONSE,
            niceError: 'Can\'t fetch tags',
            hasError: true,
            list: null
          })
        }

        let tags = resp.body.data

        var out = _.map(tags, function (tag) {
          return _.assign(_.omit(tag, ['name']), {text: tag.name})
        })

        dispatch({
          type: tagsActions.GET_TAGS_RESPONSE,
          niceError: null,
          hasError: false,
          list: out
        })
      })
  }
}
