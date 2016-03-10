'use strict'

import {combineReducers} from 'redux'

import {reducers} from '../modules/reducers'

export default function createRootReducer () {
  return combineReducers({
    routing: reducers.routeReducer,
    form: reducers.formReducer,
    auth: reducers.authReducer,
    tag: reducers.tagReducer,
    user: reducers.userReducer,
    profile: reducers.profileReducer,
    client: reducers.clientReducer
  })
}
