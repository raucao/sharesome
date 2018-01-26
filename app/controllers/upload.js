import Ember from 'ember';
import EmberObject from '@ember/object';
import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { showUrlDialog } from 'sharesome/helpers/show-url-dialog';

export default Controller.extend({

  remotestorage: service(),
  rs: alias('remotestorage.rs'),

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

  isSmallScreen: function() {
    return window.innerWidth <= 640;
  }.property(),

  actions: {

    readInputFile: function(inputFile) {
      let self = this;

      let file = EmberObject.create({
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

      this.get('rs').shares.storeFile(file.get('type'), file.get('name'), file.get('binary')).then(url => {
        this.setProperties({
          file: null,
          isUploading: false
        });
        showUrlDialog(url);
      }, error => {
        this.set('isUploading', false);
        window.vex.dialog.alert('Something bad happened during upload.<br />Please try again.');
        console.error(error);
      });
    }
  }
});
