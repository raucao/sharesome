import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import VexInitializer from 'sharesome/initializers/vex';

module('Unit | Initializer | vex', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    VexInitializer.initialize(this.owner);
    assert.ok(true);
  });
});