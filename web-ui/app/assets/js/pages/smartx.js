'use strict';

/* global define:true*/
//noinspection JSUnresolvedFunction
define([  'jquery',
  'jquery.bootstrap',
  'knockout',
  '../../../assets/js/views/diskListViewmodel.js',
  '../../../assets/js/support/settings.js'
], function ($, bootstrap, ko, DiskListViewModel, Settings) {

  return {
    // Application entry point
    start: function () {
      //noinspection JSUnresolvedVariable,JSUnresolvedFunction
      ko.applyBindings(DiskListViewModel, $('#mainPage')[0]);
      DiskListViewModel.bindSubView();

      // Static values
      DiskListViewModel.refreshFrequency(Settings.get().refreshIntervalSeconds);

      // To refresh automatically
      DiskListViewModel.refreshIntervalId = this.invokeAndRepeat(function () {
        DiskListViewModel.fetch(DiskListViewModel);
      }, Settings.get().refreshIntervalSeconds * 1000);
    },

    /*
     * Invokes specified function immediately, then every intervalMilliseconds.
     * Returns intervalId to control it later on
     */
    invokeAndRepeat: function (toInvoke, intervalMilliseconds) {
      toInvoke();
      return setInterval(toInvoke, intervalMilliseconds);
    }
  };
});