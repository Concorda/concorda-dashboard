'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {toggleSidebar} from '../actions/sidebar'
import Sidebar from '../components/sidebar'
import Grid from '../components/grid'

export const Users = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    isExpanded: React.PropTypes.bool.isRequired
  },

  componentDidMount () {
  },

  componentWillUnmount () {
  },

  handleToggle (event) {
    event.preventDefault()

    this.props.dispatch(toggleSidebar())
  },

  render () {
    const {isExpanded, data} = this.props
    const handleToggle = this.handleToggle
    let items = this.props.result

    var styleClass = 'overview-panel'
    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      <div className="overview">
        <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
        <div className='page page-users'>
          <Grid data={items}/>
        </div>
      </div>
    )
  }
})

function mapStatesToProps (state) {
  debugger
  const {sidebar} = state
  const {getUsers} = state

  return {
    isExpanded: sidebar.isExpanded,
    result: getUsers.result
  }
}

export default connect(mapStatesToProps)(Users)
