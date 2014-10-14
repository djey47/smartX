'use strict';

//noinspection JSUnresolvedVariable,JSUnresolvedFunction,JSHint
define([  'jquery',
  'knockout',
  '../../../assets/js/views/style.js'
], function ($, ko, Style) {

  //noinspection JSUnresolvedFunction,JSUnresolvedVariable,JSUnusedGlobalSymbols
  return {
    currentDisk: ko.observable({model: ''}),

    items: ko.observableArray([]),

    get: function (disk) {
      var SmartDetailsViewModel = this;

      SmartDetailsViewModel.currentDisk(disk);
      SmartDetailsViewModel.items.removeAll();

      if (disk.smart && disk.smart.items) {
        //noinspection JSUnresolvedFunction
        disk.smart.items.forEach(function (item) {
          SmartDetailsViewModel.items.push(item);
        });
      }
    },

    // Called from binding: computed
    statusCssClass: function (status) {
      return Style.getStatusLabelCssClass(status);
    },

    // Called from binding: computed
    statusLabelText: function (status) {
      return Style.getStatusLabelText(status);
    }
  };
});