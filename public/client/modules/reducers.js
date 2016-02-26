'use strict'

import authReducer from './auth/reducers/index'
import tagReducer from './tag/reducers/index'
import {routeReducer} from 'redux-simple-router'
import {reducer as formReducer} from 'redux-form'

export var reducers = {
  tagReducer: tagReducer,
  authReducer: authReducer,
  routeReducer: routeReducer,
  formReducer: formReducer
}
