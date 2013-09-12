Sharesome.UploadView = Ember.View.extend({
  templateName: 'upload',
  hasFileToUploadBinding: 'this.controller.fileToUpload',
  classNameBindings: ['hasFileToUpload']
});
