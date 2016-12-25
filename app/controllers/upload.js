import Ember from 'ember';

export default Ember.Controller.extend({

  file: null,
  isUploading: false,

  hasFileToUpload: function() {
    return this.get('file') !== null;
  }.property('file'),

  fileIsImage: function() {
    return this.get('file.type').match('image.*');
  }.property('file'),

  simpleFileType: function() {
    let type = this.get('file.type');
    if (type && typeof type !== 'undefined' && type !== '') {
      return type.replace('/','-');
    } else {
      return "unkown";
    }
  }.property('file'),

  // Has to be called from within a user action handler, e.g. 'click'
  copyTextToClipboard(text) {
    // Create temporary element with input value
    // (has to be visible, so we move it out of view)
    let tmpEl = Ember.$('<div>');
    tmpEl.css({position: 'absolute', left: '-1000px', top: '-1000px'});
    tmpEl.text(text);
    Ember.$('body').append(tmpEl);
    // Create range and selection
    let range = document.createRange();
    let selection = window.getSelection();
    // Clear selection from any previous data.
    selection.removeAllRanges();
    // Make the range select the entire content of the contentHolder paragraph.
    range.selectNodeContents(tmpEl.get(0));
    // Add that range to the selection.
    selection.addRange(range);
    // Copy the selection to clipboard.
    document.execCommand('copy');
    // Clear selection if you want to.
    selection.removeAllRanges();
    // Remove temporary element
    tmpEl.remove();
  },

  showUrlDialog(url) {
    window.vex.dialog.alert(
      `Direct URL:<p><input type="text" value="${url}"> 
       <button class="copy-url"><img src="" alt="copy">cc</button></p>`
    );
    Ember.$('.vex-content input').first().select();

    Ember.$('.vex-content button.copy-url').on('click', (e) => {
      e.preventDefault();
      this.copyTextToClipboard(Ember.$('.vex-content input').val());
      Ember.$('.vex-content button.copy-url').html('&#10003; done');
      setTimeout(() => {
        window.vex.closeAll();
      }, 1000);
    });
  },

  actions: {

    readInputFile: function(inputFile) {
      let self = this;

      let file = Ember.Object.create({
        'name': inputFile.name,
        'type': inputFile.type,
        'size': inputFile.size,
        'binary': null,
        'base64': null
      });

      this.set('file', file);

      if (inputFile.type.match('image.*')) {
        let fileReaderBase64 = new FileReader();

        fileReaderBase64.onload = (function(/*file*/) {
          return function(/*e*/) {
            self.get('file').set('base64', this.result);
          };
        })(inputFile);

        fileReaderBase64.readAsDataURL(inputFile);
      }

      let fileReaderBinary = new FileReader();

      fileReaderBinary.onload = (function(/*file*/) {
        return function(/*e*/) {
          self.get('file').set('binary', this.result);
        };
      })(inputFile);

      fileReaderBinary.readAsArrayBuffer(inputFile);
    },

    cancelFileUpload() {
      this.set('file', null);
    },

    submitFileUpload() {
      let file = this.get('file');
      this.set('isUploading', true);

      remoteStorage.shares.storeFile(file.get('type'), file.get('name'), file.get('binary')).then(url => {
        this.setProperties({
          file: null,
          isUploading: false
        });
        this.showUrlDialog(url);
      }, error => {
        this.set('isUploading', false);
        window.vex.dialog.alert('Something bad happened during upload.<br />Please try again.');
        Ember.Logger.error(error);
      });
    }
  }
});
