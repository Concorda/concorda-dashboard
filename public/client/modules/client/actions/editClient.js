'use strict'

import * as clientActions from '../constants'

export default function editClient () {
  return (dispatch) => {
    dispatch({type: clientActions.EDIT_CLIENT})
  }
}
