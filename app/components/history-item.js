import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { showUrlDialog } from 'sharesome/helpers/show-url-dialog';

import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({

  tagName: 'li',
  remotestorage: service(),

  overlayIsVisible: false,
  url: alias('item.url'),
  name: alias('item.name'),

  isImage: computed('url', function() {
    return this.url.match(/(jpg|jpeg|png|gif|webp)$/i);
  }),

  thumbnailUrl: computed('name', function() {
    return this.get('remotestorage.shares').getThumbnailURL(this.name);
  }),

  nameWithoutTimestamp: computed('name', function() {
    return this.name.substr(12);
  }),

  isSmallScreen: computed(function() {
    return window.innerWidth <= 640;
  }).volatile(),

  // Events

  didInsertElement () {
    this._super(...arguments);
    this.imagesObserver.observe(this.$('.image')[0]);
  },

  click: function() {
    if (this.isSmallScreen) {
      this.toggleProperty('overlayIsVisible');
    }
  },

  actions: {

    share: function() {
      showUrlDialog(this.url);
    },

    zoom: function() {
      let dialogContent;

      if (this.isImage) {
        dialogContent = "<img src='"+this.url+"' class='zoomed'>";
      } else {
        dialogContent = "No preview available.";
      }

      window.vex.dialog.alert(dialogContent);
    },

    remove: function() {
      this.set('item.isDeleting', true);

      this.get('remotestorage.shares').remove(this.name).then(
        () => {
          this.removeItem(this.item);
        },
        error => {
          this.set('item.isDeleting', false);
          window.alert("Couldn't remove item. Please try again. Sorry!");
          console.log(error);
        }
      );
    }

  }

});
