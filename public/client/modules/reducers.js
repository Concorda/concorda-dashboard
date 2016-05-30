'use strict'

import authReducer from './auth/reducers/index'
import groupReducer from './group/reducers/index'
import clientReducer from './client/reducers/index'
import profileReducer from './profile/reducers/index'
import userReducer from './user/reducers/index'
import settingsReducer from './settings/reducers/index'
import logsReducer from './logs/reducers/index'

import {routeReducer} from 'redux-simple-router'
import {reducer as formReducer} from 'redux-form'

export var reducers = {
  groupReducer: groupReducer,
  authReducer: authReducer,
  routeReducer: routeReducer,
  clientReducer: clientReducer,
  formReducer: formReducer,
  profileReducer: profileReducer,
  userReducer: userReducer,
  logsReducer: logsReducer,
  settingsReducer: settingsReducer
}
