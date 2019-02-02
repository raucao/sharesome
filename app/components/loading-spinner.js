import Component from '@ember/component';

export default Component.extend({

  didInsertElement: function() {
    this._super(...arguments);

    var el = this.$('.spinner-wrapper');
    el.css('height', this.height+'px');

    var opts = {
      lines     : this.lines     || 13,     // The number of lines to draw
      length    : this.length    || 20,     // The length of each line
      width     : this.width     || 10,     // The line thickness
      radius    : this.radius    || 30,     // The radius of the inner circle
      corners   : this.corners   || 1,      // Corner roundness (0..1)
      rotate    : this.rotate    || 0,      // The rotation offset
      direction : this.direction || 1,      // 1: clockwise, -1: counterclockwise
      color     : this.color     || '#000', // #rgb or #rrggbb or array of colors
      speed     : this.speed     || 1,      // Rounds per second
      trail     : this.trail     || 60,     // Afterglow percentage
      shadow    : this.shadow    || false,  // Whether to render a shadow
      hwaccel   : this.hwaccel   || true,   // Whether to use hardware acceleration
      className : 'spinner',                       // The CSS class to assign to the spinner
      zIndex    : this.zIndex    || 2e9,    // The z-index (defaults to 2000000000)
      top       : this.top       || '0',    // Top position relative to parent in px
      left      : this.left      || '0'     // Left position relative to parent in px
    };

    el.spin(opts);
  }

});
