'use strict'

import {combineReducers} from 'redux'

import {routeReducer} from 'redux-simple-router'
import authReducer from '../reducers/auth'
import sidebarReducer from '../reducers/sidebar'
import usersReducer from '../reducers/users'

export default function createRootReducer () {
  return combineReducers({
    routing: routeReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    users: usersReducer
  })
}
