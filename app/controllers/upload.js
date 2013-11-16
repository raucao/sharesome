var UploadController = Ember.ObjectController.extend({
  content: {},
  fileToUpload: false,
  isUploading: false,

  fileIsImage: function() {
    return this.get('content.type').match('image.*');
  }.property('content.type'),

  simpleFileType: function() {
    var type = this.get('content.type');
    if (type && typeof type !== 'undefined' && type !== '') {
      return type.replace('/','-');
    } else {
      return "unkown";
    }
  }.property('content.type'),

  actions: {
    cancelFileUpload: function() {
      this.set('fileToUpload', false);
      this.set('content', {});
    },

    submitFileUpload: function() {
      var self = this;
      var file = self.get('content');
      self.set('isUploading', true);

      remoteStorage.shares.storeFile(file.type, file.name, file.binary).then(
        function(url){
          self.setProperties({
            fileToUpload: false,
            isUploading: false,
            content: {}
          });
          window.vex.dialog.alert("Direct URL:<p><input type='text' value='"+url+"'>");
          $('.vex-content input').first().select();
        }, function(error) {
          self.set('isUploading', false);
          window.vex.dialog.alert('Something bad happened during upload.<br />Please try again.');
          console.log(error);
        });
    }
  }
});

export default UploadController;
