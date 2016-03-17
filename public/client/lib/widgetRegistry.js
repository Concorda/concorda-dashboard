'use strict'

import React from 'react'
var PersonalAddress = require('../routes/editUser/components/personalAddressFields')
var OfficeAddress = require('../routes/editUser/components/officeAddressFields')

var widgets = {
  PersonalAddress: React.createClass(PersonalAddress),
  OfficeAddress: React.createClass(OfficeAddress)
}

module.exports.getWidget = function (user) {

  console.log('Choose widgets for', user)
  var widgetsForUser = []
  widgetsForUser.push(<widgets.PersonalAddress/>)
  widgetsForUser.push(<widgets.OfficeAddress/>)

  return widgetsForUser
}