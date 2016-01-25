import { moduleFor, test } from 'ember-qunit';

moduleFor('service:remote-storage', 'Unit | Service | remote storage', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

window.remoteStorage.access        = { claim() { return true; } };
window.remoteStorage.displayWidget = () => { return true; };
window.remoteStorage.on            = () => { return true; };
// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
