Sharesome.UploadFileSelectView = Ember.TextField.extend({
  type: 'file',

  change: function(event) {
    var self = this;
    var input = event.target;

    if (input.files && input.files[0]) {
      this.handleInputFile( input.files[0] );
    }
  },

  handleInputFile: function(inputFile) {
    var self = this;
    var c = self._parentView.controller;
    c.set('name', inputFile.name);
    c.set('type', inputFile.type);
    c.set('fileToUpload', true);

    if (inputFile.type.match('image.*')) {
      var fileReaderBase64 = new FileReader();

      fileReaderBase64.onload = (function(file) {
        return function(e) {
          self._parentView.controller.set('base64', this.result);
        };
      })(inputFile);

      fileReaderBase64.readAsDataURL(inputFile);
    }

    var fileReaderBinary = new FileReader();

    fileReaderBinary.onload = (function(file) {
      return function(e) {
        self._parentView.controller.set('binary', this.result);
      };
    })(inputFile);

    fileReaderBinary.readAsArrayBuffer(inputFile);
  }
});
