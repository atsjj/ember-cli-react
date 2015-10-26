/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-react',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/react/react-with-addons.js');
    app.import(app.bowerDirectory + '/react/react-dom.js');
    app.import(app.bowerDirectory + '/ember-cli-react-shims/app-shims.js');
  }
};
