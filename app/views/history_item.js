

var HistoryItemView = Ember.View.extend({
  tagName: 'li',

  overlayIsVisible: false,

  isImage: function() {
    return this.get('url').match(/(jpg|jpeg|png|gif|webp)$/i);
  }.property('url'),

  thumbnailUrl: function() {
    return remoteStorage.shares.getThumbnailURL(this.get('name'));
  }.property('name'),

  itemStyle: function() {
    if (this.get('isImage')) {
      return 'background-image:url('+this.get('thumbnailUrl')+');background-color:#ccc';
    }
  }.property('url'),

  nameWithoutTimestamp: function() {
    return this.get('name').substr(12);
  }.property('name'),

  // Events

  didInsertElement: function() {
    var name = this.get('name');
  },

  click: function() {
    // TODO use App.isSmallScreen
    if (window.innerWidth <= 640) {
      var overlayIsVisible = this.get('overlayIsVisible');
      this.set('overlayIsVisible', !overlayIsVisible);
    }
  }
});

export default HistoryItemView;
