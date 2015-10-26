'use strict';

var Promise = require('ember-cli/lib/ext/promise');

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    return Promise.all([
      this.addBowerPackageToProject('react', '0.14.0'),
      this.addBowerPackageToProject('ember-cli-react-shims', 'atsjj/ember-cli-react-shims#0.14.0')
    ]);
  }
};