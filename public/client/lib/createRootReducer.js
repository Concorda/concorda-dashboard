'use strict'

import {combineReducers} from 'redux'

import {reducers} from '../modules/reducers'
import userReducer from '../reducers/user'
import profileReducer from '../reducers/profile'
import clientReducer from '../reducers/client'

export default function createRootReducer () {
  return combineReducers({
    routing: reducers.routeReducer,
    form: reducers.formReducer,
    auth: reducers.authReducer,
    tag: reducers.tagReducer,
    user: userReducer,
    profile: profileReducer,
    client: clientReducer
  })
}
