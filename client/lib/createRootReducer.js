'use strict'

import {combineReducers} from 'redux'

import {routeReducer} from 'redux-simple-router'
import authReducer from '../reducers/auth'
import userReducer from '../reducers/user'
import profileReducer from '../reducers/profile'
import clientReducer from '../reducers/client'
import {reducer as formReducer} from 'redux-form'

export default function createRootReducer () {
  return combineReducers({
    routing: routeReducer,
    form: formReducer,
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
    client: clientReducer
  })
}
