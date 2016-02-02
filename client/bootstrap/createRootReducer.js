'use strict'

import {combineReducers} from 'redux'

import {routeReducer} from 'redux-simple-router'
import authReducer from '../reducers/auth'
import sidebarReducer from '../reducers/sidebar'
import usersReducer from '../reducers/users'
import profileReducer from '../reducers/profile'
import {reducer as formReducer} from 'redux-form'

export default function createRootReducer () {
  return combineReducers({
    routing: routeReducer,
    form: formReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    users: usersReducer,
    profile: profileReducer
  })
}
