/* eslint no-unused-vars:0 */
'use strict'

import React from 'react'
import {Provider} from 'react-redux'
import {createHistory} from 'history'
import {syncReduxAndRouter} from 'redux-simple-router'
import {Router, Route, IndexRoute} from 'react-router'

import {logout, validateCookie} from '../actions/auth'
import Shell from '../containers/shell'
import Login from '../containers/login'
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

export default function createRootComponent (store) {
  const history = createHistory()

  function requireAuth (nextState) {
    const nextPath = nextState.location.pathname

    store.dispatch(validateCookie(nextPath))
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

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Shell}>
          <IndexRoute component={Overview} onEnter={requireAuth} />
          <Route path="users" component={Users} onEnter={requireAuth} />
          <Route path="user/add" component={AddUser} onEnter={requireAuth} />
          <Route path="user/:id/edit" component={EditUser} onEnter={requireAuth} />
          <Route path="profile" component={Profile} onEnter={requireAuth} />
          <Route path="login(/:callback_url)" component={Login} />
          <Route path="logout(/:callback_url)" onEnter={handleLogout} />
          <Route path="register(/:callback_url)" component={Register} />
          <Route path="password_reset" component={PasswordReset} />
          <Route path="password_reset/:token" component={SetPassword} />
          <Route path="invite_user" component={InviteUser} onEnter={requireAuth}/>
          <Route path="clients" component={Clients} onEnter={requireAuth}/>
          <Route path="client/add" component={AddClient} onEnter={requireAuth}/>
          <Route path="client/:id/edit" component={Client} onEnter={requireAuth}/>
          <Route path="client/:id" component={Client} onEnter={requireAuth}/>
        </Route>
      </Router>
    </Provider>
  )
}
