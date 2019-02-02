'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      exclude: [
        'apple-touch-icon.png',
        'favicon.ico'
      ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/vex/css/vex.css');
  app.import('bower_components/vex/css/vex-theme-flat-attack.css');

  app.import('bower_components/vex/js/vex.combined.min.js');
  app.import('vendor/spin-js/spin.min.js');
  app.import('vendor/spin-js/jquery.spin.js');
  app.import('vendor/intersection-observer.js');

  return app.toTree();
};
