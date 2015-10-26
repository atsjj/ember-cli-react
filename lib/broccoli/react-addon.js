/* global require, module */
'use strict';

/**
@module ember-cli
*/
var defaults = require('merge-defaults');
var merge    = require('lodash/object/merge');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = ReactAddon;

/**
  ReactAddon is the main class Ember CLI uses to manage the Brocolli trees
  for your application. It is very tightly integrated with Brocolli and has
  an `toTree()` method you can use to get the entire tree for your application.
  Available init options:
    - es3Safe, defaults to `true`,
    - storeConfigInMeta, defaults to `false`,
    - tests, defaults to `false`
    - autoRun, defaults to `true`,
    - outputPaths, defaults to `{}`,
    - minifyCSS, defaults to `{enabled: !!isProduction,options: { relativeTo: 'app/styles' }},
    - minifyJS, defaults to `{enabled: !!isProduction},
    - loader, defaults to this.bowerDirectory + '/loader.js/loader.js',
    - sourcemaps, defaults to `{}`,
    - trees, defaults to `{},`
    - jshintrc, defaults to `{},`
    - vendorFiles, defaults to `{}`
  @class ReactAddon
  @constructor
  @param {Object} options Configuration options
*/
function ReactAddon() {
  var args = [];
  var options = {};

  for (var i = 0, l = arguments.length; i < l; i++) {
    args.push(arguments[i]);
  }

  if (args.length === 1) {
    options = args[0];
  } else if (args.length > 1) {
    args.reverse();
    options = defaults.apply(null, args);
  }

  this.appConstructor(merge(options, {
    babel: {
      filterExtensions: ['js', 'jsx'],
      nonStandard: true
    },
    storeConfigInMeta: false,
    tests: false,
    vendorFiles: {
      'jquery.js': null,
      'handlebars.js': null,
      'ember.js': null,
      'ember-testing.js': [],
      'app-shims.js': null,
      'ember-resolver.js': null,
      'ember-load-initializers.js': null
    }
  }, defaults));
}

ReactAddon.prototype = Object.create(EmberApp.prototype);
ReactAddon.prototype.constructor = ReactAddon;
ReactAddon.prototype.appConstructor = EmberApp.prototype.constructor;

ReactAddon.prototype._contentForAppBoot = function _contentForAppBoot(content, config) {
  content.push('require("' +
                config.modulePrefix +
                '/app")["default"].create(' +
                calculateAppConfig(config) +
                ');');
};

function calculateAppConfig(config) {
  return JSON.stringify(config.APP || {});
}