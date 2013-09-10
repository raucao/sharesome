Sharesome.HistoryItemComponent = Ember.Component.extend({
  isImage: function() {
    return this.get('url').match(/(jpg|jpeg|png|gif)$/);
  }.property('url')
});
