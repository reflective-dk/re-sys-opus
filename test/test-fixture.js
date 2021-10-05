window.testDataDir = window.testDataDir || './test/data/';

/* global requirejs */
requirejs.config({
  baseUrl: '../node_modules/re-common-app/',
  paths: {
    common: './lib',
    forms: './lib/forms',
    'views/ro': '../../views/ro',
    'views/opus': '../../views/opus',
    'views/thisted': '../../views/thisted',
    controllers: '../../data',
    testforms: '../../data',
    moment: './js/moment-with-locales',
    libphonenumber: './js/libphonenumber-js.min',
    webix: './js/webix_debug',
    'es6-promise': './js/es6-promise.min',
    axios: './js/axios'
  },
  shim: {
    webix: {
      exports: 'webix'
    }
  }
});

requirejs(['webix'], function (webix) {
  webix.$testmode = true;
});

//IE 11 polyfill
require(['es6-promise'], function (es6) {
  Number.isInteger = Number.isInteger || function(value) {
    return typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value;
  };
  es6.polyfill();
});
requirejs(['common/re-webix']);