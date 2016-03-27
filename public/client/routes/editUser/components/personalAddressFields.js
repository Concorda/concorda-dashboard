'use strict'

import React from 'react'

module.exports = {
  render: function () {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <input placeholder="personal address" className="input-large"/>
        </div>
        <div className="col-xs-12 col-sm-6">
          <input placeholder="personal phone" className="input-large"/>
        </div>
      </div>
    );
  }
}