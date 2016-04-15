"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('Sharesome/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'Sharesome/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _SharesomeConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _SharesomeConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _SharesomeConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _SharesomeConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('Sharesome/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'Sharesome/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _SharesomeConfigEnvironment) {

  var name = _SharesomeConfigEnvironment['default'].APP.name;
  var version = _SharesomeConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('Sharesome/components/file-dropzone', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    tagName: 'section',
    classNames: ['file-dropzone content upload'],
    classNameBindings: ['hasFileToUpload'],

    dragEnter: function dragEnter() {
      this.$().addClass('drag-active');
      return false;
    },

    dragOver: function dragOver() {
      return false;
    },

    dragLeave: function dragLeave() {
      this.$().removeClass('drag-active');
      return false;
    },

    drop: function drop(e) {
      e.preventDefault();
      this.$().removeClass('drag-active');

      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        this.sendAction('readInputFile', e.dataTransfer.files[0]);
      }
    },

    actions: {

      readInputFile: function readInputFile(file) {
        this.sendAction('readInputFile', file);
      }

    }

  });
});
define('Sharesome/components/file-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    tagName: 'input',
    attributeBindings: ['type', 'accept', 'multiple', 'disabled'],
    type: 'file',
    accept: 'image/*',
    multiple: false,

    attachment: null,
    filename: null,
    disabled: null,
    maxFileSize: null,

    change: function change(event) {
      var input = event.target;
      if (!_ember['default'].isPresent(input.files)) {
        return;
      }

      this.sendAction('readInputFile', input.files[0]);
    }

  });
});
define('Sharesome/components/history-item', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    tagName: 'li',

    overlayIsVisible: false,
    urlBinding: 'item.url',
    nameBinding: 'item.name',

    isImage: (function () {
      return this.get('url').match(/(jpg|jpeg|png|gif|webp)$/i);
    }).property('url'),

    thumbnailUrl: (function () {
      return remoteStorage.shares.getThumbnailURL(this.get('name'));
    }).property('name'),

    itemStyle: (function () {
      if (this.get('isImage')) {
        return 'background-image:url(' + this.get('thumbnailUrl') + ');background-color:#ccc';
      }
    }).property('url'),

    nameWithoutTimestamp: (function () {
      return this.get('name').substr(12);
    }).property('name'),

    // Events

    click: function click() {
      // TODO use App.isSmallScreen
      if (window.innerWidth <= 640) {
        var overlayIsVisible = this.get('overlayIsVisible');
        this.set('overlayIsVisible', !overlayIsVisible);
      }
    },

    actions: {

      share: function share() {
        window.vex.dialog.alert("Direct URL:<p><input type='text' value='" + this.get('url') + "'>");
        _ember['default'].$('.vex-content input').first().select();
      },

      zoom: function zoom() {
        var dialogContent = undefined;

        if (this.get('isImage')) {
          dialogContent = "<img src='" + this.get('url') + "' class='zoomed'>";
        } else {
          dialogContent = "No preview available.";
        }

        window.vex.dialog.alert(dialogContent);
      },

      remove: function remove() {
        var _this = this;

        this.set('item.isDeleting', true);

        remoteStorage.shares.remove(this.get('name')).then(function () {
          _this.sendAction('removeItem', _this.get('item'));
        }, function (error) {
          _this.set('item.isDeleting', false);
          window.alert("Couldn't remove item. Please try again. Sorry!");
          console.log(error);
        });
      }

    }

  });
});
define('Sharesome/components/loading-spinner', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    startSpinner: (function () {
      var el = this.$('.spinner-wrapper');
      el.css('height', this.get('height') + 'px');

      var opts = {
        lines: this.get('lines') || 13, // The number of lines to draw
        length: this.get('length') || 20, // The length of each line
        width: this.get('width') || 10, // The line thickness
        radius: this.get('radius') || 30, // The radius of the inner circle
        corners: this.get('corners') || 1, // Corner roundness (0..1)
        rotate: this.get('rotate') || 0, // The rotation offset
        direction: this.get('direction') || 1, // 1: clockwise, -1: counterclockwise
        color: this.get('color') || '#000', // #rgb or #rrggbb or array of colors
        speed: this.get('speed') || 1, // Rounds per second
        trail: this.get('trail') || 60, // Afterglow percentage
        shadow: this.get('shadow') || false, // Whether to render a shadow
        hwaccel: this.get('hwaccel') || true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: this.get('zIndex') || 2e9, // The z-index (defaults to 2000000000)
        top: this.get('top') || '0', // Top position relative to parent in px
        left: this.get('left') || '0' // Left position relative to parent in px
      };

      el.spin(opts);
    }).on('didInsertElement')

  });
});
define('Sharesome/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('Sharesome/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('Sharesome/controllers/history', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({

    sortProperties: ['name:desc'],
    sortedModel: _ember['default'].computed.sort('model', 'sortProperties'),

    itemCount: (function () {
      return this.get('model').length;
    }).property('model.[]'),

    actions: {

      removeItem: function removeItem(item) {
        console.log('CALLED FROM CONTROLLER YO');
        this.get('model').removeObject(item);
        return true;
      }

    }

  });
});
define('Sharesome/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('Sharesome/controllers/upload', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({

    file: null,
    isUploading: false,

    hasFileToUpload: (function () {
      return this.get('file') !== null;
    }).property('file'),

    fileIsImage: (function () {
      return this.get('file.type').match('image.*');
    }).property('file'),

    simpleFileType: (function () {
      var type = this.get('file.type');
      if (type && typeof type !== 'undefined' && type !== '') {
        return type.replace('/', '-');
      } else {
        return "unkown";
      }
    }).property('file'),

    actions: {

      readInputFile: function readInputFile(inputFile) {
        var self = this;

        var file = _ember['default'].Object.create({
          'name': inputFile.name,
          'type': inputFile.type,
          'size': inputFile.size,
          'binary': null,
          'base64': null
        });

        this.set('file', file);

        if (inputFile.type.match('image.*')) {
          var fileReaderBase64 = new FileReader();

          fileReaderBase64.onload = (function () /*file*/{
            return function () /*e*/{
              self.get('file').set('base64', this.result);
            };
          })(inputFile);

          fileReaderBase64.readAsDataURL(inputFile);
        }

        var fileReaderBinary = new FileReader();

        fileReaderBinary.onload = (function () /*file*/{
          return function () /*e*/{
            self.get('file').set('binary', this.result);
          };
        })(inputFile);

        fileReaderBinary.readAsArrayBuffer(inputFile);
      },

      cancelFileUpload: function cancelFileUpload() {
        this.set('file', null);
      },

      submitFileUpload: function submitFileUpload() {
        var _this = this;

        var file = this.get('file');
        this.set('isUploading', true);

        remoteStorage.shares.storeFile(file.get('type'), file.get('name'), file.get('binary')).then(function (url) {
          _this.setProperties({
            file: null,
            isUploading: false
          });
          window.vex.dialog.alert("Direct URL:<p><input type='text' value='" + url + "'>");
          _ember['default'].$('.vex-content input').first().select();
        }, function (error) {
          _this.set('isUploading', false);
          window.vex.dialog.alert('Something bad happened during upload.<br />Please try again.');
          console.log(error);
        });
      }
    }
  });
});
define('Sharesome/helpers/human-file-size', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Handlebars.makeBoundHelper(function (fileSizeInBytes /*, options*/) {
    var i = -1;
    var byteUnits = [' KB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
    } while (fileSizeInBytes > 1024);

    return String(Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i]);
  });
});
define('Sharesome/helpers/moment-calendar', ['exports', 'ember', 'Sharesome/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _ember, _SharesomeConfigEnvironment, _emberMomentHelpersMomentCalendar) {
  exports['default'] = _emberMomentHelpersMomentCalendar['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_SharesomeConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('Sharesome/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _emberMomentHelpersMomentDuration) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentDuration['default'];
    }
  });
});
define('Sharesome/helpers/moment-format', ['exports', 'ember', 'Sharesome/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _SharesomeConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_SharesomeConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('Sharesome/helpers/moment-from-now', ['exports', 'ember', 'Sharesome/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _SharesomeConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_SharesomeConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('Sharesome/helpers/moment-to-now', ['exports', 'ember', 'Sharesome/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _SharesomeConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_SharesomeConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('Sharesome/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _emberMomentHelpersNow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersNow['default'];
    }
  });
});
define('Sharesome/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'Sharesome/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _SharesomeConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_SharesomeConfigEnvironment['default'].APP.name, _SharesomeConfigEnvironment['default'].APP.version)
  };
});
define('Sharesome/initializers/export-application-global', ['exports', 'ember', 'Sharesome/config/environment'], function (exports, _ember, _SharesomeConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_SharesomeConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _SharesomeConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_SharesomeConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('Sharesome/initializers/remote-storage', ['exports', 'sharesome/services/remote-storage'], function (exports, _sharesomeServicesRemoteStorage) {
  exports.initialize = initialize;

  function initialize(container, application) {
    container.register('service:rs', _sharesomeServicesRemoteStorage['default']);

    application.inject('controller', 'rs', 'service:rs');
    application.inject('route', 'rs', 'service:rs');
    application.inject('model', 'rs', 'service:rs');
    application.inject('component', 'rs', 'service:rs');
  }

  exports['default'] = {
    name: 'remote-storage',
    initialize: initialize
  };
});
define('Sharesome/initializers/vex', ['exports'], function (exports) {
  exports.initialize = initialize;

  function initialize() /* application */{
    window.vex.defaultOptions.className = 'vex-theme-flat-attack';
  }

  exports['default'] = {
    name: 'vex',
    initialize: initialize
  };
});
define('Sharesome/router', ['exports', 'ember', 'Sharesome/config/environment'], function (exports, _ember, _SharesomeConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _SharesomeConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.resource('history', { path: '/history' });
  });

  exports['default'] = Router;
});
define('Sharesome/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('Sharesome/routes/history', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({

    beforeModel: function beforeModel() {
      if (!this.rs.connected) {
        this.transitionTo('index');
      }
    },

    model: function model() {
      return remoteStorage.shares.list().then(function (listing) {
        var filenames = Object.keys(listing);
        var shares = [];

        filenames.forEach(function (filename) {
          var item = _ember['default'].Object.create({
            name: filename,
            url: remoteStorage.shares.getFileURL(filename),
            isDeleting: false
          });
          shares.pushObject(item);
        });

        return shares;
      });
    }

  });
});
define('Sharesome/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    renderTemplate: function renderTemplate() {
      this.render('upload', {
        controller: 'upload'
      });
    }
  });
});
define('Sharesome/services/moment', ['exports', 'ember', 'Sharesome/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _SharesomeConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_SharesomeConfigEnvironment['default'], 'moment.outputFormat')
  });
});
define('Sharesome/services/remote-storage', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Service.extend({

    connected: false,
    connecting: false,

    setup: (function () {
      var _this = this;

      RemoteStorage.WireClient.REQUEST_TIMEOUT = 90000;

      remoteStorage.access.claim('shares', 'rw');
      remoteStorage.displayWidget({ redirectUri: window.location.href });

      remoteStorage.on('ready', function () {
        console.log('RS ready');
        _this.setProperties({
          'connecting': false,
          'connected': true
        });
      });
      remoteStorage.on('not-connected', function () {
        console.log('RS not-connected');
        _this.setProperties({
          'connecting': false,
          'connected': false
        });
      });
      remoteStorage.on('connected', function () {
        console.log('RS connected');
        _this.setProperties({
          'connecting': false,
          'connected': true
        });
      });
      remoteStorage.on('disconnected', function () {
        console.log('RS disconnected');
        _this.setProperties({
          'connecting': false,
          'connected': false
        });
      });
      remoteStorage.on('connecting', function () {
        console.log('RS connecting');
        _this.setProperties({
          'connecting': true,
          'connected': false
        });
      });
      remoteStorage.on('authing', function () {
        console.log('RS authing');
        _this.setProperties({
          'connecting': true,
          'connected': false
        });
      });
    }).on('init')

  });
});
define("Sharesome/templates/_welcome", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "Sharesome/templates/_welcome.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "class", "content welcome");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Welcome!");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    With ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("Sharesome");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(", you can share files on the Web from your own\n    remote storage.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    Connect your storage using the remoteStorage widget in the upper right\n    corner, or ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "target", "_blank");
        dom.setAttribute(el3, "href", "http://remotestorage.io/get");
        var el4 = dom.createTextNode("visit the\n      remoteStorage website");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" to register for an account or learn how to set\n    up your own storage server.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("Sharesome/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 18
            },
            "end": {
              "line": 3,
              "column": 39
            }
          },
          "moduleName": "Sharesome/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("S");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 21
            },
            "end": {
              "line": 4,
              "column": 71
            }
          },
          "moduleName": "Sharesome/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "icon-history");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 2
            },
            "end": {
              "line": 10,
              "column": 2
            }
          },
          "moduleName": "Sharesome/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "outlet", ["loc", [null, [9, 4], [9, 14]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 4
              },
              "end": {
                "line": 16,
                "column": 4
              }
            },
            "moduleName": "Sharesome/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("section");
            dom.setAttribute(el1, "class", "content remotestorage-connecting");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("p");
            var el3 = dom.createTextNode("Connecting");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["inline", "spinner", [], ["height", 300, "width", 5, "radius", 30, "color", "#222", "top", "auto", "left", "auto"], ["loc", [null, [13, 8], [13, 84]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 16,
                "column": 4
              },
              "end": {
                "line": 18,
                "column": 4
              }
            },
            "moduleName": "Sharesome/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "partial", ["welcome"], [], ["loc", [null, [17, 6], [17, 27]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 2
            },
            "end": {
              "line": 19,
              "column": 2
            }
          },
          "moduleName": "Sharesome/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "rs.connecting", ["loc", [null, [11, 10], [11, 23]]]]], [], 0, 1, ["loc", [null, [11, 4], [18, 11]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 0
          }
        },
        "moduleName": "Sharesome/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3, "id", "logo");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3, "id", "history");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("main");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], [], 0, null, ["loc", [null, [3, 18], [3, 51]]]], ["block", "link-to", ["history"], [], 1, null, ["loc", [null, [4, 21], [4, 83]]]], ["block", "if", [["get", "rs.connected", ["loc", [null, [8, 8], [8, 20]]]]], [], 2, 3, ["loc", [null, [8, 2], [19, 9]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("Sharesome/templates/components/file-dropzone", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "Sharesome/templates/components/file-dropzone.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "hint");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "draghere");
        var el4 = dom.createTextNode("Drag file here or tap anywhere");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "taptoupload");
        var el4 = dom.createTextNode("Tap anywhere and select a file");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        dom.setAttribute(el1, "class", "file-picker");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        return morphs;
      },
      statements: [["inline", "file-input", [], ["readInputFile", "readInputFile"], ["loc", [null, [8, 2], [8, 46]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("Sharesome/templates/components/history-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "Sharesome/templates/components/history-item.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "image");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'style');
          return morphs;
        },
        statements: [["attribute", "style", ["get", "itemStyle", ["loc", [null, [2, 29], [2, 38]]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "Sharesome/templates/components/history-item.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "image generic-file");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          dom.setAttribute(el2, "class", "meta");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 0, 0);
          return morphs;
        },
        statements: [["content", "nameWithoutTimestamp", ["loc", [null, [5, 20], [5, 44]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 18,
                "column": 4
              },
              "end": {
                "line": 20,
                "column": 4
              }
            },
            "moduleName": "Sharesome/templates/components/history-item.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "loading-spinner", [], ["height", 120, "width", 3, "radius", 20, "color", "#eee", "top", "auto", "left", "auto"], ["loc", [null, [19, 4], [19, 88]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 20,
                "column": 4
              },
              "end": {
                "line": 22,
                "column": 4
              }
            },
            "moduleName": "Sharesome/templates/components/history-item.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "loading-spinner", [], ["height", 200, "width", 4, "radius", 20, "color", "#eee", "top", "auto", "left", "auto"], ["loc", [null, [21, 4], [21, 88]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 0
            },
            "end": {
              "line": 24,
              "column": 0
            }
          },
          "moduleName": "Sharesome/templates/components/history-item.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "overlay-deleting");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "if", [["get", "App.isSmallScreen", ["loc", [null, [18, 10], [18, 27]]]]], [], 0, 1, ["loc", [null, [18, 4], [22, 11]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 0
          }
        },
        "moduleName": "Sharesome/templates/components/history-item.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "share");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "icon-export");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "zoom");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "icon-eye");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "go-to-url");
        dom.setAttribute(el2, "target", "_blank");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "icon-download");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "delete");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "icon-trash");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3]);
        var element4 = dom.childAt(element1, [5]);
        var element5 = dom.childAt(element1, [7]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createAttrMorph(element1, 'class');
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createElementMorph(element3);
        morphs[4] = dom.createAttrMorph(element4, 'href');
        morphs[5] = dom.createElementMorph(element5);
        morphs[6] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "isImage", ["loc", [null, [1, 6], [1, 13]]]]], [], 0, 1, ["loc", [null, [1, 0], [7, 7]]]], ["attribute", "class", ["concat", ["overlay", " ", ["subexpr", "if", [["get", "overlayIsVisible", []], "visible", ""], [], []]]]], ["element", "action", ["share"], [], ["loc", [null, [10, 19], [10, 37]]]], ["element", "action", ["zoom"], [], ["loc", [null, [11, 18], [11, 35]]]], ["attribute", "href", ["get", "url", ["loc", [null, [12, 30], [12, 33]]]]], ["element", "action", ["remove"], [], ["loc", [null, [13, 20], [13, 39]]]], ["block", "if", [["get", "item.isDeleting", ["loc", [null, [16, 6], [16, 21]]]]], [], 2, null, ["loc", [null, [16, 0], [24, 7]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("Sharesome/templates/components/loading-spinner", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "Sharesome/templates/components/loading-spinner.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "spinner-wrapper");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("Sharesome/templates/history", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 4
            },
            "end": {
              "line": 5,
              "column": 4
            }
          },
          "moduleName": "Sharesome/templates/history.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "history-item", [], ["item", ["subexpr", "@mut", [["get", "item", ["loc", [null, [4, 26], [4, 30]]]]], [], []], "removeItem", "removeItem"], ["loc", [null, [4, 6], [4, 56]]]]],
        locals: ["item"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "Sharesome/templates/history.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "class", "content history");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "sortedModel", ["loc", [null, [3, 12], [3, 23]]]]], [], 0, null, ["loc", [null, [3, 4], [5, 13]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("Sharesome/templates/upload", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 7,
                  "column": 6
                },
                "end": {
                  "line": 9,
                  "column": 6
                }
              },
              "moduleName": "Sharesome/templates/upload.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "loading-spinner", [], ["height", 200, "width", 4, "radius", 20, "color", "#222", "top", "auto", "left", "auto"], ["loc", [null, [8, 6], [8, 90]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 9,
                  "column": 6
                },
                "end": {
                  "line": 11,
                  "column": 6
                }
              },
              "moduleName": "Sharesome/templates/upload.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "loading-spinner", [], ["height", 300, "width", 5, "radius", 30, "color", "#222", "top", "auto", "left", "auto"], ["loc", [null, [10, 6], [10, 90]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 2
              },
              "end": {
                "line": 14,
                "column": 2
              }
            },
            "moduleName": "Sharesome/templates/upload.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("section");
            dom.setAttribute(el1, "class", "content upload-in-progress");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("p");
            var el3 = dom.createTextNode("Uploading");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["block", "if", [["get", "App.isSmallScreen", ["loc", [null, [7, 12], [7, 29]]]]], [], 0, 1, ["loc", [null, [7, 6], [11, 13]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 17,
                  "column": 8
                },
                "end": {
                  "line": 21,
                  "column": 8
                }
              },
              "moduleName": "Sharesome/templates/upload.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "id", "file-preview");
              dom.setAttribute(el1, "class", "image");
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("img");
              dom.setAttribute(el2, "id", "preview-image");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n        ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element1 = dom.childAt(fragment, [1, 1]);
              var morphs = new Array(1);
              morphs[0] = dom.createAttrMorph(element1, 'src');
              return morphs;
            },
            statements: [["attribute", "src", ["get", "file.base64", ["loc", [null, [19, 50], [19, 61]]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 21,
                  "column": 8
                },
                "end": {
                  "line": 25,
                  "column": 8
                }
              },
              "moduleName": "Sharesome/templates/upload.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "id", "file-preview");
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("p");
              var el3 = dom.createTextNode("icon for CSS class");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("br");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("code");
              var el4 = dom.createTextNode("#filepreview.");
              dom.appendChild(el3, el4);
              var el4 = dom.createComment("");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n        ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var morphs = new Array(2);
              morphs[0] = dom.createAttrMorph(element0, 'class');
              morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 2]), 1, 1);
              return morphs;
            },
            statements: [["attribute", "class", ["concat", [["subexpr", "-bind-attr-class", [["get", "simpleFileType", []], "simple-file-type"], [], []]]]], ["content", "simpleFileType", ["loc", [null, [23, 54], [23, 72]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 2
              },
              "end": {
                "line": 36,
                "column": 2
              }
            },
            "moduleName": "Sharesome/templates/upload.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("section");
            dom.setAttribute(el1, "class", "content upload-preview");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "upload-preview");
            var el3 = dom.createTextNode("\n");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("p");
            dom.setAttribute(el3, "class", "meta-data");
            var el4 = dom.createTextNode("\n          ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("span");
            dom.setAttribute(el4, "class", "name");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n          ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("span");
            dom.setAttribute(el4, "class", "size");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("p");
            dom.setAttribute(el3, "class", "actions");
            var el4 = dom.createTextNode("\n          ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("button");
            dom.setAttribute(el4, "class", "upload");
            var el5 = dom.createTextNode("Upload");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n          ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("button");
            dom.setAttribute(el4, "class", "cancel");
            var el5 = dom.createTextNode("Cancel");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1, 1]);
            var element3 = dom.childAt(element2, [3]);
            var element4 = dom.childAt(element2, [5]);
            var element5 = dom.childAt(element4, [1]);
            var element6 = dom.childAt(element4, [3]);
            var morphs = new Array(5);
            morphs[0] = dom.createMorphAt(element2, 1, 1);
            morphs[1] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
            morphs[2] = dom.createMorphAt(dom.childAt(element3, [3]), 0, 0);
            morphs[3] = dom.createElementMorph(element5);
            morphs[4] = dom.createElementMorph(element6);
            return morphs;
          },
          statements: [["block", "if", [["get", "fileIsImage", ["loc", [null, [17, 14], [17, 25]]]]], [], 0, 1, ["loc", [null, [17, 8], [25, 15]]]], ["content", "file.name", ["loc", [null, [27, 29], [27, 42]]]], ["inline", "human-file-size", [["get", "file.size", ["loc", [null, [28, 47], [28, 56]]]]], [], ["loc", [null, [28, 29], [28, 58]]]], ["element", "action", ["submitFileUpload"], [], ["loc", [null, [31, 18], [31, 47]]]], ["element", "action", ["cancelFileUpload"], [], ["loc", [null, [32, 18], [32, 47]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 37,
              "column": 0
            }
          },
          "moduleName": "Sharesome/templates/upload.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "isUploading", ["loc", [null, [5, 8], [5, 19]]]]], [], 0, 1, ["loc", [null, [5, 2], [36, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "Sharesome/templates/upload.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "file-dropzone", [], ["hasFileToUpload", ["subexpr", "@mut", [["get", "hasFileToUpload", ["loc", [null, [1, 32], [1, 47]]]]], [], []], "readInputFile", "readInputFile"], ["loc", [null, [1, 0], [2, 47]]]], ["block", "if", [["get", "hasFileToUpload", ["loc", [null, [4, 6], [4, 21]]]]], [], 0, null, ["loc", [null, [4, 0], [37, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('sharesome/config/environment', ['ember'], function(Ember) {
  var prefix = 'sharesome';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("sharesome/app")["default"].create({"name":"Sharesome","version":"1.0.0+82ab957f"});
}

/* jshint ignore:end */
//# sourceMappingURL=Sharesome.map