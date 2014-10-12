// Application entry point
'use strict';

/* global define:true*/
//noinspection JSUnresolvedFunction
define([  'jquery',
  'jquery.bootstrap',
  'knockout',
  '../../../assets/js/views/diskListViewmodel.js',
  '../../../assets/js/support/settings.js'
], function ($, bootstrap, ko, DiskListViewModel, Settings) {

  /*
   * Invokes specified function immediately, then every intervalMilliseconds.
   * Returns intervalId to control it later on
   */
  var invokeAndRepeat = function (toInvoke, intervalMilliseconds) {
    toInvoke(DiskListViewModel);
    return setInterval(toInvoke(DiskListViewModel), intervalMilliseconds);
  };

  //noinspection JSUnresolvedVariable,JSUnresolvedFunction
  ko.applyBindings(DiskListViewModel, $('#mainPage')[0]);
  DiskListViewModel.bindSubView();

  // Static values
  DiskListViewModel.refreshFrequency(Settings.get().refreshIntervalSeconds);

  // To refresh automatically
  DiskListViewModel.refreshIntervalId = invokeAndRepeat(DiskListViewModel.fetch, Settings.get().refreshIntervalSeconds * 1000);
});