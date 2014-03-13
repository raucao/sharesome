var UploadFileSelectView = Ember.TextField.extend({
  type: 'file',

  change: function(event) {
    var input = event.target;
    var uploadController = this._parentView.controller;

    if (input.files && input.files[0]) {
      uploadController.handleInputFile( input.files[0] );
    }
  }
});

export default UploadFileSelectView;
