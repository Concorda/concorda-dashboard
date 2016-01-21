'use strict'

import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default React.createClass({
  render () {
    // products will be presented by react-bootstrap-table

    let data = this.props.data

    return (
      <BootstrapTable data={data} pagination={false} striped={true} hover={true}>
        <TableHeaderColumn dataField="name" isKey={true} dataAlign="left" dataSort={true}>User Name</TableHeaderColumn>
        <TableHeaderColumn dataField="email" dataSort={true}>Email</TableHeaderColumn>
      </BootstrapTable>
    )
  }
})
