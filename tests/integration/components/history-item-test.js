import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('history-item', 'Integration | Component | history item', {
  integration: true
});

window.remoteStorage.shares = {
  getThumbnailURL(name) {
    return 'https://storage.kosmos.org/public/shares/thumbnails/'+name;
  }
};

test('it renders images', function(assert) {

  let item = Ember.Object.create({
    name: 'foobar.jpg',
    url: 'https://storage.kosmos.org/public/shares/foobar.jpg',
    isDeleting: false
  });
  this.set('item', item);

  // TODO
  // stub remoteStorage.shares.getThumbnailURL(name);

  this.render(hbs`{{history-item item=item}}`);

  assert.equal(this.$('div.image').attr('data-src'),
               'https://storage.kosmos.org/public/shares/thumbnails/foobar.jpg');

  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
});
