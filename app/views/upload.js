import Ember from 'ember';

export default Ember.View.extend({

  templateName: 'upload',
  hasFileToUploadBinding: 'this.controller.hasFileToUpload',
  classNameBindings: ['hasFileToUpload'],

  didInsertElement: function() {
    var self = this;
    this.$('#dropzone').bind('dragenter', function() {
      Ember.$(this).addClass('drag-active');
      return false;
    });
    this.$('#dropzone').bind('dragover', function (e) {
      e.preventDefault();
      return false;
    });
    this.$('#dropzone').bind('dragleave', function() {
      Ember.$(this).removeClass('drag-active');
      return false;
    });
    this.$('#dropzone').bind('drop', function(e) {
      Ember.$(this).removeClass('drag-active');
      e.preventDefault();
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        self.controller.handleInputFile(e.dataTransfer.files[0]);
      }
    });
  }
});
