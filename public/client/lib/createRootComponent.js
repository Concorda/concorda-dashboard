/* eslint no-unused-vars:0 */
'use strict'

import React from 'react'
import {Provider} from 'react-redux'
import {createHistory} from 'history'
import {syncReduxAndRouter} from 'redux-simple-router'
import {Router, Route, IndexRoute} from 'react-router'

import {logout, validateCookie} from '../modules/auth/actions/index'

import {validateInitConfig} from '../modules/client/actions/index'

import Shell from '../routes/shell'
import Overview from '../routes/overview'
import Login from '../routes/login'
import Client from '../routes/client'
import AddClient from '../routes/addClient'
import Clients from '../routes/clients'
import Profile from '../routes/profile'
import AddUser from '../routes/addUser'
import EditUser from '../routes/editUser'
import InviteUser from '../routes/inviteUser'
import PasswordReset from '../routes/passReset'
import Register from '../routes/register'
import SetPassword from '../routes/setPassword'
import Users from '../routes/users'

import Groups from '../routes/groups'

import PublicClientConf from '../routes/publicClientConf'

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
    getComponents: Shell,
    indexRoute: {getComponents: Overview, onEnter: requireAuth},
    childRoutes: [
      {path: 'login(/:callback_url)', getComponents: Login, onEnter: requireConf},
      {path: 'logout(/:callback_url)', onEnter: handleLogout},

      {path: 'users', getComponents: Users, onEnter: requireAuth},
      {path: 'user/add', getComponents: AddUser, onEnter: requireAuth},
      {path: 'user/:id/edit', getComponents: EditUser, onEnter: requireAuth},
      {path: 'profile', getComponents: Profile, onEnter: requireAuth},

      {path: 'groups', getComponents: Groups, onEnter: requireAuth},

      {path: 'register(/:callback_url)', getComponents: Register},
      {path: 'password_reset', getComponents: PasswordReset},
      {path: 'password_reset/:token', getComponents: SetPassword},
      {path: 'invite_user', getComponents: InviteUser, onEnter: requireAuth},

      {path: 'clients', getComponents: Clients, onEnter: requireAuth},
      {path: 'client/add/new', getComponents: AddClient, onEnter: requireAuth},
      {path: 'client/:id/edit', getComponents: Client, onEnter: requireAuth},
      {path: 'client/:id/view', getComponents: Client, onEnter: requireAuth},
      {path: 'public_client_conf', getComponents: PublicClientConf}
    ]
  }

  return (
    <Provider store={store}>
      <Router history={history} routes={routeConfig}></Router>
    </Provider>
  )
}
