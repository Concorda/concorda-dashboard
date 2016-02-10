'use strict'

import './index.html'
import './assets/css/main.styl'

import ReactDom from 'react-dom'

import createRootReducer from './lib/createRootReducer'
import configureStore from './lib/configureStore'
import createRootComponent from './lib/createRootComponent'

const rootReducer = createRootReducer()
const createStore = configureStore()

const initalState = {
  auth: {
    hasError: false
  }
}

const store = createStore(rootReducer, initalState)
const root = createRootComponent(store)
const hook = document.getElementById('app')

ReactDom.render(root, hook)
