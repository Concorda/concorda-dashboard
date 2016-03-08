'use strict'

import {combineReducers} from 'redux'

import {reducers} from '../modules/reducers'
import userReducer from '../reducers/user'

export default function createRootReducer () {
  return combineReducers({
    routing: reducers.routeReducer,
    form: reducers.formReducer,
    auth: reducers.authReducer,
    tag: reducers.tagReducer,
    user: userReducer,
    profile: reducers.profileReducer,
    client: reducers.clientReducer
  })
}
