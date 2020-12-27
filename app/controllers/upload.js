import EmberObject, { computed } from '@ember/object';
import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { showUrlDialog } from 'sharesome/helpers/show-url-dialog';
import { isPresent } from '@ember/utils';

export default Controller.extend({

  remotestorage: service(),
  rs: alias('remotestorage.rs'),

  file: null,
  isUploading: false,

  hasFileToUpload: computed('file', function() {
    return this.file !== null;
  }),

  fileIsImage: computed('file', function() {
    return this.get('file.type').match('image.*');
  }),

  simpleFileType: computed('file', function() {
    let type = this.get('file.type');
    if (type && typeof type !== 'undefined' && type !== '') {
      return type.replace('/','-');
    } else {
      return "unkown";
    }
  }),

  isSmallScreen: computed(function() {
    return window.innerWidth <= 640;
  }).volatile(),

  actions: {

    readInputFile (inputFile) {
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

    cancelFileUpload () {
      this.set('file', null);
    },

    submitFileUpload () {
      let file = this.file;
      this.set('isUploading', true);

      const filetype = isPresent(file.get('type')) ? file.get('type') : 'application/octet-stream';

      this.rs.shares.storeFile(filetype, file.get('name'), file.get('binary')).then(url => {
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
