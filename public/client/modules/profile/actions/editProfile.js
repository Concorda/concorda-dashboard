'use strict'

import * as profileActions from '../constants'

export default function editProfile () {
  return (dispatch) => {
    dispatch({type: profileActions.EDIT_PROFILE})
  }
}
