define('Sharesome/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('Sharesome/tests/components/file-dropzone.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/file-dropzone.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/file-dropzone.js should pass jshint.');
  });
});
define('Sharesome/tests/components/file-input.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/file-input.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/file-input.js should pass jshint.');
  });
});
define('Sharesome/tests/components/history-item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/history-item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/history-item.js should pass jshint.');
  });
});
define('Sharesome/tests/components/loading-spinner.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/loading-spinner.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/loading-spinner.js should pass jshint.');
  });
});
define('Sharesome/tests/controllers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });
});
define('Sharesome/tests/controllers/history.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/history.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/history.js should pass jshint.');
  });
});
define('Sharesome/tests/controllers/upload.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/upload.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/upload.js should pass jshint.');
  });
});
define('Sharesome/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('Sharesome/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('Sharesome/tests/helpers/human-file-size.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/human-file-size.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/human-file-size.js should pass jshint.');
  });
});
define('Sharesome/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'Sharesome/tests/helpers/start-app', 'Sharesome/tests/helpers/destroy-app'], function (exports, _qunit, _SharesomeTestsHelpersStartApp, _SharesomeTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _SharesomeTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _SharesomeTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('Sharesome/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('Sharesome/tests/helpers/resolver', ['exports', 'ember/resolver', 'Sharesome/config/environment'], function (exports, _emberResolver, _SharesomeConfigEnvironment) {

  var resolver = _emberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _SharesomeConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _SharesomeConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('Sharesome/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('Sharesome/tests/helpers/start-app', ['exports', 'ember', 'Sharesome/app', 'Sharesome/config/environment'], function (exports, _ember, _SharesomeApp, _SharesomeConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _SharesomeConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _SharesomeApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('Sharesome/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('Sharesome/tests/initializers/remote-storage.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - initializers/remote-storage.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/remote-storage.js should pass jshint.');
  });
});
define('Sharesome/tests/initializers/vex.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - initializers/vex.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/vex.js should pass jshint.');
  });
});
define('Sharesome/tests/integration/components/history-item-test', ['exports', 'ember', 'ember-qunit'], function (exports, _ember, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('history-item', 'Integration | Component | history item', {
    integration: true
  });

  window.remoteStorage.shares = {
    getThumbnailURL: function getThumbnailURL(name) {
      return 'https://storage.kosmos.org/public/shares/thumbnails/' + name;
    }
  };

  (0, _emberQunit.test)('it renders images', function (assert) {

    var item = _ember['default'].Object.create({
      name: 'foobar.jpg',
      url: 'https://storage.kosmos.org/public/shares/foobar.jpg',
      isDeleting: false
    });
    this.set('item', item);

    // TODO
    // stub remoteStorage.shares.getThumbnailURL(name);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.12',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 26
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
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
        statements: [['inline', 'history-item', [], ['item', ['subexpr', '@mut', [['get', 'item', ['loc', [null, [1, 20], [1, 24]]]]], [], []]], ['loc', [null, [1, 0], [1, 26]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('div.image').attr('style').match(/url\((.+)\)/)[1], 'https://storage.kosmos.org/public/shares/thumbnails/foobar.jpg');

    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  });
});
define('Sharesome/tests/integration/components/history-item-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/history-item-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/history-item-test.js should pass jshint.');
  });
});
define('Sharesome/tests/integration/components/loading-spinner-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  // import hbs from 'htmlbars-inline-precompile';

  (0, _emberQunit.moduleForComponent)('loading-spinner', 'Integration | Component | loading spinner', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    // TODO load spin.js somehow
    // this.render(hbs`{{loading-spinner}}`);

    // assert.equal(this.$('.spinner-wrapper').length, 1);

    assert.ok(true);
  });
});
define('Sharesome/tests/integration/components/loading-spinner-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/loading-spinner-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/loading-spinner-test.js should pass jshint.');
  });
});
define('Sharesome/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('Sharesome/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('Sharesome/tests/routes/history.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/history.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/history.js should pass jshint.');
  });
});
define('Sharesome/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('Sharesome/tests/services/remote-storage.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/remote-storage.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/remote-storage.js should pass jshint.');
  });
});
define('Sharesome/tests/test-helper', ['exports', 'Sharesome/tests/helpers/resolver', 'ember-qunit'], function (exports, _SharesomeTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_SharesomeTestsHelpersResolver['default']);

  window.vex = { defaultOptions: {} };
  window.RemoteStorage = {
    WireClient: {},
    log: function log() {
      return true;
    }
  };
  window.remoteStorage = {};
});
define('Sharesome/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('Sharesome/tests/unit/initializers/remote-storage-test', ['exports', 'ember', 'Sharesome/initializers/remote-storage', 'qunit'], function (exports, _ember, _SharesomeInitializersRemoteStorage, _qunit) {

  var application = undefined,
      container = undefined;

  (0, _qunit.module)('Unit | Initializer | remote storage', {
    beforeEach: function beforeEach() {
      _ember['default'].run(function () {
        application = _ember['default'].Application.create();
        container = application.__container__;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _SharesomeInitializersRemoteStorage['default'].initialize(container, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('Sharesome/tests/unit/initializers/remote-storage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/initializers/remote-storage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/remote-storage-test.js should pass jshint.');
  });
});
define('Sharesome/tests/unit/initializers/vex-test', ['exports', 'ember', 'Sharesome/initializers/vex', 'qunit'], function (exports, _ember, _SharesomeInitializersVex, _qunit) {

  var application = undefined;

  (0, _qunit.module)('Unit | Initializer | vex', {
    beforeEach: function beforeEach() {
      _ember['default'].run(function () {
        application = _ember['default'].Application.create();
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _SharesomeInitializersVex['default'].initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('Sharesome/tests/unit/initializers/vex-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/initializers/vex-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/vex-test.js should pass jshint.');
  });
});
define('Sharesome/tests/unit/services/remote-storage-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:remote-storage', 'Unit | Service | remote storage', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  window.remoteStorage.access = { claim: function claim() {
      return true;
    } };
  window.remoteStorage.displayWidget = function () {
    return true;
  };
  window.remoteStorage.on = function () {
    return true;
  };
  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('Sharesome/tests/unit/services/remote-storage-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services/remote-storage-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/remote-storage-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('sharesome/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map