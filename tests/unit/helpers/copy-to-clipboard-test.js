import { copyToClipboard } from '../../../helpers/copy-to-clipboard';
import { module, test } from 'qunit';

module('Unit | Helper | copy to clipboard', function() {
  test('it returns false when called outside an action handler', function(assert) {
    let result = copyToClipboard('some text');
    // This should fail, because it's not called from a
    // user action handler
    assert.notOk(result);
  });
});
