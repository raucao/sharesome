import Ember from 'ember';
import RemoteStorageInitializer from '../../../initializers/remote-storage';
import { module, test } from 'qunit';

let application,
    container;

module('Unit | Initializer | remote storage', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  RemoteStorageInitializer.initialize(container, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
