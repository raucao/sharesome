Sharesome.UploadController = Ember.ObjectController.extend({
  content: {},
  fileToUpload: false,

  fileIsImage: function() {
    return this.get('content.type').match('image.*');
  }.property('content.type')
});
