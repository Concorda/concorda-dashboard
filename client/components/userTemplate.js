'use strict'

import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render () {
    const isExpanded = this.props.isExpanded
    const onToggle = this.props.onToggle
    let styleClass = 'sidebar'

    if (!isExpanded) {
      styleClass = styleClass + '-docked'
    }

    return (
      <div>
        <input ref="name" placeholder="Name" className="input-large col-xs-12 col-md-12 col-lg-12" required />
        <input ref="email" type="email" placeholder="Email" className="input-large col-xs-12 col-md-12 col-lg-12" required />
        <input ref="password" type="password" placeholder="Password" className="input-large col-xs-12 col-md-12 col-lg-12" required />
        <input ref="repeat" type="password" placeholder="Confirm Password" className="input-large col-xs-12 col-md-12 col-lg-12" required /><br/>
        <button type="submit" className="btn btn-large submit col-xs-10 col-md-8 col-lg-6">Submit</button>
      </div>
    )
  }
})
