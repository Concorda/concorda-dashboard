'use strict'

import React from 'react'

export default React.createClass({
  render: function () {
    return (
      <footer className="footer txt-small txt-dimmed mt2x mb txt-center has-icon" role="contentinfo">
        <div className="container-fluid">
          <a href="https://github.com/nearform/concorda/issues" className="icon icon-bug icon-dimmed"></a>
          <p className="m0">{'MIT. Copyright © 2016. Concorda User Management'}</p>
        </div>
      </footer>
    )
  }
})
