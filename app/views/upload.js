var UploadView = Ember.View.extend({
  templateName: 'upload',
  hasFileToUploadBinding: 'this.controller.fileToUpload',
  classNameBindings: ['hasFileToUpload'],

  didInsertElement: function() {
    this.$('#dropzone').bind('dragenter', function() {
      $(this).addClass('drag-active');
      return false;
    });
    this.$('#dropzone').bind('dragover', function (e) {
      e.preventDefault();
      return false;
    });
    this.$('#dropzone').bind('dragleave', function() {
      $(this).removeClass('drag-active');
      return false;
    });
    this.$('#dropzone').bind('drop', function(e) {
      $(this).removeClass('drag-active');
    });
  }
});

export default UploadView;
