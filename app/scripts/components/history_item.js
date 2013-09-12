Sharesome.HistoryItemComponent = Ember.Component.extend({
  isImage: function() {
    return this.get('url').match(/(jpg|jpeg|png|gif)$/);
  }.property('url'),

  itemStyle: function() {
    if (this.get('isImage')) {
      return 'background-image: url('+this.get('url')+')';
    }
  }.property('url')
});
