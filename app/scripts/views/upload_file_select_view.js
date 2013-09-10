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
    // console.log('Input file: ', inputFile);
    var self = this;
    var c = self._parentView.controller;
    c.set('name', inputFile.name);
    c.set('type', inputFile.type);
    c.set('fileToUpload', inputFile.type);

    if (inputFile.type.match('image.*')) {
      var fileReaderBase64 = new FileReader();

      fileReaderBase64.onload = function(e) {
        // console.log('Base64 result: ', e.srcElement.result);
        self._parentView.controller.set('base64', e.srcElement.result);
      };

      fileReaderBase64.readAsDataURL(inputFile);
    }

    var fileReaderBinary = new FileReader();

    fileReaderBinary.onload = function(e) {
      // console.log('Binary result: ', e.srcElement.result);
      self._parentView.controller.set('binary', e.srcElement.result);
    };

    fileReaderBinary.readAsArrayBuffer(inputFile);
  }
});
