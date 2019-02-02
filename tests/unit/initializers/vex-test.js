import Application from '@ember/application';
import { run } from '@ember/runloop';
import VexInitializer from '../../../initializers/vex';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | vex', function(hooks) {
  hooks.beforeEach(function() {
    run(function() {
      application = Application.create();
      application.deferReadiness();
    });
  });

  // Replace this with your real tests.
  test('it works', function(assert) {
    VexInitializer.initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
