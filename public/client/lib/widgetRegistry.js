'use strict'

import React from 'react'
const _ = require('lodash')

var widgets = {}

var getWidget = function (user) {

  var PersonalAddress = React.createClass(require('../routes/editUser/components/personalAddressFields'))
  var OfficeAddress = React.createClass(require('../routes/editUser/components/officeAddressFields'))
  var Rcslider = React.createClass(require('rc-slider'))

  widgets['user'] = {
    PersonalAddress:<PersonalAddress user={user}/>,
    OfficeAddress: <OfficeAddress user={user}/>,
    Rcslider: <Rcslider user={user}/>
  }


  console.log('Choose widgets for', user)
  return _.values(widgets.user)
}

module.exports.getWidget = getWidget
