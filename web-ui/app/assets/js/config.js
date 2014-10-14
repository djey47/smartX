'use strict';

//noinspection JSUnresolvedVariable,JSUnresolvedFunction
require.config({
  paths: {
    'bower_components': '../../bower_components',
    'jquery': '../../bower_components/jquery/dist/jquery',
    'knockout.validation': '../../bower_components/knockout.validation/Dist/knockout.validation',
    'jquery.bootstrap': '../../bower_components/bootstrap-sass/dist/js/bootstrap'
  },
  shim: {
    'jquery.bootstrap': {
      deps: ['jquery']
    },
    'knockout.validation': {
      deps: ['knockout']
    }
  },
  map: {
    '*': {
      'knockout': '../../bower_components/knockout.js/knockout',
      'ko': '../../bower_components/knockout.js/knockout'
    }
  }
});

// Use the debug version of knockout in development only
/* global window:true*/
//noinspection JSUnresolvedVariable
if (window.knockoutBootstrapDebug) {
  //noinspection JSUnresolvedVariable,JSUnresolvedFunction
  require.config({
    map: {
      '*': {
        'knockout': '../../bower_components/knockout.js/knockout.debug.js',
        'ko': '../../bower_components/knockout.js/knockout.debug.js'
      }
    }
  });
}

//noinspection JSUnresolvedVariable
if (!window.requireTestMode) {
  //noinspection JSUnresolvedFunction
  require(['pages/smartx'], function (SmartXApp) {

		SmartXApp.start();

  });
}