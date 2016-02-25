/* eslint no-unused-vars:0 */
'use strict'

import React from 'react'
import {Provider} from 'react-redux'
import {createHistory} from 'history'
import {syncReduxAndRouter} from 'redux-simple-router'
import {Router, Route, IndexRoute} from 'react-router'

import {logout} from '../modules/auth/actions/logout'
import {validateCookie} from '../modules/auth/actions/validateCookie'

import {validateInitConfig} from '../actions/client'
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
import Clients from '../containers/clients'
import AddClient from '../containers/addClient'
import Client from '../containers/client'
import PublicClientConf from '../containers/publicClientConf'

import Login from '../routes/login'

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
      {path: "login(/:callback_url)", getComponents: Login, onEnter: requireConf},
      {path: "logout(/:callback_url)", onEnter: handleLogout},
      {path: "users", component: Users, onEnter: requireAuth},
      {path: "user/add", component: AddUser, onEnter: requireAuth},
      {path: "user/:id/edit", component: EditUser, onEnter: requireAuth},
      {path: "profile", component: Profile, onEnter: requireAuth},
      {path: "register(/:callback_url)", component: Register},
      {path: "password_reset", component: PasswordReset},
      {path: "password_reset/:token", component: SetPassword},
      {path: "invite_user", component: InviteUser, onEnter: requireAuth},
      {path: "clients", component: Clients, onEnter: requireAuth},
      {path: "client/add/new", component: AddClient, onEnter: requireAuth},
      {path: "client/:id/edit", component: Client, onEnter: requireAuth},
      {path: "client/:id/view", component: Client, onEnter: requireAuth},
      {path: "public_client_conf", component: PublicClientConf}
    ]
  }

  return (
    <Provider store={store}>
      <Router history={history} routes={routeConfig}></Router>
    </Provider>
  )
}
