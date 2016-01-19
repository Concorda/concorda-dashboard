'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Sidebar from '../components/sidebar'
import Dashboard from '../components/dashboard'
import {toggleSidebar} from '../actions/sidebar'

export const Home = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    isExpanded: React.PropTypes.bool.isRequired,
    data: React.PropTypes.object.isRequired,
  },

  handleToggle (event) {
    event.preventDefault()

    this.props.dispatch(toggleSidebar())
  },

  render () {
    const {isExpanded, data} = this.props
    const handleToggle = this.handleToggle

    return (
      <div className="presenter">
        <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
        <Dashboard isExpanded={!isExpanded} data={data} />
      </div>
    )
  }
})

function mapStatesToProps (state) {
  const {sidebar} = state

  return {
    isExpanded: sidebar.isExpanded,
    data: {}
  }
}

export default connect(mapStatesToProps)(Home)
