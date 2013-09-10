Sharesome.UploadController = Ember.ArrayController.extend({
  content: [{name: 1}, {name: 2}, {name: 3}],

  hasFilesToUpload: function() {
    return this.get('content').length > 0;
  }
});
