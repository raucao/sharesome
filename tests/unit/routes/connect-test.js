import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | connect', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:connect');
    assert.ok(route);
  });
});
