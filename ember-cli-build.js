'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { compatBuild } = require('@embroider/compat');

module.exports = async function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  const { buildOnce } = await import('@embroider/vite');

  return compatBuild(app, buildOnce);
};