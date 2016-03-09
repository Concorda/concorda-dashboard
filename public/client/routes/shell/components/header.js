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
            {(showProfile ? <Menu handleEditUserProfile={handleEditUserProfile}/> : null)}
            <div className="col-xs-12">
              <Link to={'/'} className='logo logo-concorda'><h2 className="m0">Concorda: Dashboard</h2></Link>
            </div>
          </div>
        </div>
      </header>
    )
  }
})
