/*
 * This script provides function to retrieve configuration from a specific JSON file.
 * Use get() function to lazy load settings
 */
'use strict';

//noinspection JSUnresolvedVariable,JSUnresolvedFunction,JSHint
define([  'jquery'
], function ($) {

  return {
    settings: null,

    // Loads (when needed) and returns settings
    get: function () {
      if (!this.settings) {
        this.load();
      }

      return this.settings;
    },

    load: function () {
      var Settings = this;

      //noinspection JSUnresolvedFunction,JSUnusedGlobalSymbols
      $.ajax({
        url: 'conf/smartx.json',
        async: false,
        dataType: 'json',

        success: function (data) {
          //noinspection JSHint
          /** @namespace data.refreshIntervalSeconds */
          Settings.settings = {
            // URL of services (e.g pi-control module)
            webServicesUrl: 'http://' + location.host + '/pi-control/',

            // Refresh disk list every ? secs
            refreshIntervalSeconds: data.refreshIntervalSeconds
          };
        }
      });
    }
  };
});