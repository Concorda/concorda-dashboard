'use strict'

import React from 'react'
import {Link} from 'react-router'
import Menu from './menu'

export default React.createClass({
  render () {
    const {showProfile, handleEditUserProfile} = this.props

    return (
      <header className="header" role="banner">
        <div className="container-fluid">
          <div className="row middle-xs">
            <div className="has-icon col-xs-8 col-sm-6">
              <Link to={'/'} className='logo logo-concorda'></Link>
              <h2 className="m0">Concorda: Dashboard</h2>
            </div>
            {(showProfile ? <Menu handleEditUserProfile={handleEditUserProfile} /> : null)}
          </div>
        </div>
      </header>
    )
  }
})
