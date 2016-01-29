'use strict'

import * as profileActions from '../constants/profile'

const profileState = {
  hasError: false,
  niceError: null,
  data: null,
  editProfile: false
}

export default function profile (state = profileState, action) {
  switch (action.type) {
    case profileActions.GET_PROFILE_REQUEST:
      return Object.assign({}, state, {
        hasError: false,
        niceError: null,
        data: null
      })

    case profileActions.GET_PROFILE_RESPONSE:
      return Object.assign({}, state, {
        hasError: action.hasError,
        niceError: action.niceError,
        data: action.data
      })

    case profileActions.UPDATE_PROFILE_REQUEST:
      return Object.assign({}, state, {
        hasError: false,
        niceError: null,
        data: action.data
      })

    case profileActions.UPDATE_PROFILE_RESPONSE:
      return Object.assign({}, state, {
        hasError: action.hasError,
        niceError: action.niceError,
        data: action.data,
        editProfile: !state.editProfile
      })

    case profileActions.EDIT_PROFILE:
      return Object.assign({}, state, {
        editProfile: !state.editProfile
      })

    default:
      return state
  }
}
