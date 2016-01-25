import Ember from 'ember';

export default Ember.Component.extend({

  startSpinner: function() {
    var el = this.$('.spinner-wrapper');
    el.css('height', this.get('height')+'px');

    var opts = {
      lines     : this.get('lines')     || 13,     // The number of lines to draw
      length    : this.get('length')    || 20,     // The length of each line
      width     : this.get('width')     || 10,     // The line thickness
      radius    : this.get('radius')    || 30,     // The radius of the inner circle
      corners   : this.get('corners')   || 1,      // Corner roundness (0..1)
      rotate    : this.get('rotate')    || 0,      // The rotation offset
      direction : this.get('direction') || 1,      // 1: clockwise, -1: counterclockwise
      color     : this.get('color')     || '#000', // #rgb or #rrggbb or array of colors
      speed     : this.get('speed')     || 1,      // Rounds per second
      trail     : this.get('trail')     || 60,     // Afterglow percentage
      shadow    : this.get('shadow')    || false,  // Whether to render a shadow
      hwaccel   : this.get('hwaccel')   || true,   // Whether to use hardware acceleration
      className : 'spinner',                       // The CSS class to assign to the spinner
      zIndex    : this.get('zIndex')    || 2e9,    // The z-index (defaults to 2000000000)
      top       : this.get('top')       || '0',    // Top position relative to parent in px
      left      : this.get('left')      || '0'     // Left position relative to parent in px
    };

    el.spin(opts);
  }.on('didInsertElement')

});
