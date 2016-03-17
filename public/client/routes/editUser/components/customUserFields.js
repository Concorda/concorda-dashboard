'use strict'

import widgetRegistry from '../../../lib/widgetRegistry'
import {connect} from 'react-redux'

import React, {
  Component
} from 'react'

let CustomUserFields = React.createClass({

  render () {
    const { editUser } = this.props
    var widgets = widgetRegistry.getWidget(editUser)

    return (
      <div>
        {widgets}
      </div>
    )
  }
})

export default connect((state) => {
  return {
    editUser: state.user.editUser ? state.user.editUser : null
  }
})(CustomUserFields)