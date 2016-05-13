'use strict'

import Request from 'superagent/lib/client'
import _ from 'lodash'

import * as groupsActions from '../constants'

export default function getGroups () {
  return (dispatch) => {
    dispatch({type: groupsActions.GET_GROUPS_REQUEST})

    Request
      .get('/api/v1/group')
      .end((err, resp) => {
        if (err || !resp.body) {
          return dispatch({
            type: groupsActions.GET_GROUPS_RESPONSE,
            niceError: 'Can\'t fetch groups',
            hasError: true,
            list: null
          })
        }

        let groups = resp.body.data

        //var out = _.map(groups, function (group) {
        //  return _.assign(_.omit(group, ['name']), {text: group.name})
        //})

        dispatch({
          type: groupsActions.GET_GROUPS_RESPONSE,
          niceError: null,
          hasError: false,
          list: groups || []
        })
      })
  }
}
