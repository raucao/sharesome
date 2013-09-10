Sharesome.UploadFileSelectView = Ember.TextField.extend({
  type: 'file',
  change: function(event) {
    var self = this;
    var input = event.target;

    if (input.files) {
      $.each(input.files, function(file) {
        console.log(file);
        self.content.push(file);
      });
      // var reader = new FileReader();
      // var that = this;
      // reader.onload = function(e) {
      //   var fileToUpload = e.srcElement.result;
      //   self.get('controller').set(self.get('name'), fileToUpload);
      // };
      // reader.readAsDataURL(input.files[0]);
    }
  }
});
