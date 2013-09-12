Sharesome.UploadController = Ember.ObjectController.extend({
  content: {},
  fileToUpload: false,

  fileIsImage: function() {
    return this.get('content.type').match('image.*');
  }.property('content.type'),

  actions: {
    submitFileUpload: function() {
      var self = this;
      var file = this.get('content');

      remoteStorage.shares.storeFile(file.type, file.name, file.binary).then(
        function(url){
          self.set('fileToUpload', false);
          self.set('content', {});
          window.alert("Here's ur URL: " + url);
        }, function(error) {
          window.alert('Something bad happened during upload. Please try again.');
          console.log(error);
        });
    }
  }
});
