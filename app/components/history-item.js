import { htmlSafe } from '@ember/string';
import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { showUrlDialog } from 'sharesome/helpers/show-url-dialog';

export default Component.extend({

  tagName: 'li',
  rs: null,

  overlayIsVisible: false,
  url: alias('item.url'),
  name: alias('item.name'),

  isImage: function() {
    return this.get('url').match(/(jpg|jpeg|png|gif|webp)$/i);
  }.property('url'),

  thumbnailUrl: function() {
    return this.get('rs').shares.getThumbnailURL(this.get('name'));
  }.property('name'),

  itemStyle: function() {
    if (this.get('isImage')) {
      return htmlSafe(`background-image:url(${this.get('thumbnailUrl')});background-color:#ccc`);
    }
  }.property('url'),

  nameWithoutTimestamp: function() {
    return this.get('name').substr(12);
  }.property('name'),

  isSmallScreen: function() {
    return window.innerWidth <= 640;
  }.property(),

  // Events

  click: function() {
    if (this.get('isSmallScreen')) {
      var overlayIsVisible = this.get('overlayIsVisible');
      this.set('overlayIsVisible', !overlayIsVisible);
    }
  },

  actions: {

    share: function() {
      showUrlDialog(this.get('url'));
    },

    zoom: function() {
      let dialogContent;

      if (this.get('isImage')) {
        dialogContent = "<img src='"+this.get('url')+"' class='zoomed'>";
      } else {
        dialogContent = "No preview available.";
      }

      window.vex.dialog.alert(dialogContent);
    },

    remove: function() {
      this.set('item.isDeleting', true);

      this.get('rs').shares.remove(this.get('name')).then(
        () => {
          this.sendAction('removeItem', this.get('item'));
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
