'use strict'

import React from 'react'

module.exports = {
  render: function () {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <input placeholder="office address" className="input-large"/>
        </div>
        <div className="col-xs-12 col-sm-6">
          <input placeholder="office phone" className="input-large"/>
        </div>
      </div>
    );
  }
}