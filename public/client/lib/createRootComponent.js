/* eslint no-unused-vars:0 */
'use strict'

import React from 'react'
import {Provider} from 'react-redux'
import {createHistory} from 'history'
import {syncReduxAndRouter} from 'redux-simple-router'
import {Router, Route, IndexRoute} from 'react-router'

import logout from '../modules/auth/actions/logout'
import validateCookie from '../modules/auth/actions/validateCookie'

import validateInitConfig from '../modules/client/actions/validateInitConfig'
import Shell from '../containers/shell'
import Overview from '../containers/overview'
import Users from '../containers/users'
import AddUser from '../containers/addUser'
import EditUser from '../containers/editUser'
import Profile from '../containers/profile'
import PasswordReset from '../containers/passReset'
import SetPassword from '../containers/setPassword'
import InviteUser from '../containers/inviteUser'
import Register from '../containers/register'
import PublicClientConf from '../containers/publicClientConf'

import Login from '../routes/login'
import Client from '../routes/client'
import AddClient from '../routes/addClient'
import Clients from '../routes/clients'

export default function createRootComponent (store) {
  const history = createHistory()

  function requireAuth (nextState) {
    const nextPath = nextState.location.pathname

    store.dispatch(validateCookie(nextPath))
  }

  function requireConf () {
    store.dispatch(validateInitConfig())
  }

  function handleLogout (nextState) {
    const {params} = nextState
    let data = {}
    if (params && params.callback_url) {
      data.callback_url = params.callback_url
    }
    store.dispatch(logout(data))
  }

  syncReduxAndRouter(history, store)

  const routeConfig = {
    path: '/',
    component: Shell,
    indexRoute: {component: Overview, onEnter: requireAuth},
    childRoutes: [
      {path: 'login(/:callback_url)', getComponents: Login, onEnter: requireConf},
      {path: 'logout(/:callback_url)', onEnter: handleLogout},
      {path: 'users', component: Users, onEnter: requireAuth},
      {path: 'user/add', component: AddUser, onEnter: requireAuth},
      {path: 'user/:id/edit', component: EditUser, onEnter: requireAuth},
      {path: 'profile', component: Profile, onEnter: requireAuth},
      {path: 'register(/:callback_url)', component: Register},
      {path: 'password_reset', component: PasswordReset},
      {path: 'password_reset/:token', component: SetPassword},
      {path: 'invite_user', component: InviteUser, onEnter: requireAuth},
      {path: 'clients', getComponents: Clients, onEnter: requireAuth},
      {path: 'client/add/new', getComponents: AddClient, onEnter: requireAuth},
      {path: 'client/:id/edit', getComponents: Client, onEnter: requireAuth},
      {path: 'client/:id/view', getComponents: Client, onEnter: requireAuth},
      {path: 'public_client_conf', component: PublicClientConf}
    ]
  }

  return (
    <Provider store={store}>
      <Router history={history} routes={routeConfig}></Router>
    </Provider>
  )
}
