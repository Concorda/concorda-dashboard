'use strict'

import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render () {
    const {handleEditUserProfile} = this.props
    return (
      <div className="nav-main-wrapper">
        <input type="checkbox" name="nav-menu-handle" id="nav-menu-handle" className="nav-menu-handle"/>
        <label htmlFor="nav-menu-handle"></label>

        <nav role="navigation" className="nav-main">

          <ul className="list-unstyled list-inline">
            <li className="nav-item"><Link to={'/'}>Overview</Link></li>
            <li className="nav-item"><Link to={'/settings'}>Settings</Link></li>
            <li className="nav-item"><Link to={'/clients'}>Applications</Link></li>
            <li className="nav-item"><Link to={'/users'}>Users</Link></li>
            <li className="nav-item"><Link to={'/groups'}>Groups</Link></li>
            <li className="nav-item">
              <a onClick={() => { handleEditUserProfile() }} className="has-icon has-icon-profile">
                <span className="icon icon-profile"></span>
                <span>Profile</span>
              </a>
            </li>
            <li className="nav-item">
              <Link to={'/logout'} className="has-icon has-icon-signout">
                <span className="icon icon-signout"></span>
                <span>Sign out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
})
