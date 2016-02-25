'use strict'

import auth from './auth/reducers/index'
import {routeReducer} from 'redux-simple-router'
import {reducer as formReducer} from 'redux-form'

export var reducers = {
  authReducer: auth,
  routeReducer: routeReducer,
  formReducer: formReducer
}