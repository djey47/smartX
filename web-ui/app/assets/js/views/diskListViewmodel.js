'use strict';

//noinspection JSUnresolvedVariable,JSUnresolvedFunction,JSHint
define([  'jquery',
  'knockout',
  '../../../assets/js/views/smartDetailsViewmodel.js',
  '../../../assets/js/views/style.js',
  '../../../assets/js/support/settings.js',
  '../../../assets/js/biz/diskHelper.js'
], function ($, ko, SmartDetailsViewModel, Style, Settings, DiskHelper) {

  //noinspection JSHint,JSUnresolvedFunction,JSUnusedGlobalSymbols
  return {
    refreshing: ko.observable(false),

    refreshFrequency: ko.observable('?'),

    refreshIntervalId: 0,

    disks: ko.observableArray([]),

    // Called from timer
    fetch: function (DiskListViewModel) {

      DiskListViewModel.refreshing(true);

      //Requests disk list
      //noinspection JSUnresolvedFunction
      $.getJSON(Settings.get().webServicesUrl + 'esxi/disks.json', function (diskListData) {
        DiskListViewModel.refreshing(false);

        //noinspection JSUnresolvedFunction
        DiskListViewModel.disks.removeAll();

        //Builds disk list for SMART request
        var diskIds = '';
        for (var id = 1; id <= diskListData.disks.length; id++) {

          diskIds = diskIds.concat(id.toString());

          if (id < diskListData.disks.length) {
            diskIds = diskIds.concat(',');
          }
        }

        //Requests SMART data for these disks
        //noinspection JSUnresolvedFunction
        $.getJSON(Settings.get().webServicesUrl + 'esxi/disks/' + diskIds + '/smart.json', function (diskSmartData) {
          //noinspection JSHint,JSUnresolvedFunction
          /** @namespace diskSmartData.disks_smart */
          $.each(diskSmartData.disks_smart, function (index, smartData) {
            var disk = diskListData.disks[index];
            disk.smart = smartData.smart;

            //Updates model with disk list
            DiskListViewModel.disks.push(disk);
          });
        });
      });
    },

    bindSubView: function () {
      var smartPopup = $('#smartPopup');
      //noinspection JSUnresolvedFunction
      ko.applyBindings(SmartDetailsViewModel, smartPopup[0]);
    },

    // Called from binding: click on row
    showSmartDetails: function (disk) {
      //noinspection JSUnresolvedVariable,JSUnresolvedFunction
      var smartPopup = $('#smartPopup');

      //noinspection JSUnresolvedFunction
      SmartDetailsViewModel.items.removeAll();

      SmartDetailsViewModel.get(disk);

      //noinspection JSUnresolvedFunction
      smartPopup.modal('show');
    },

    // Called from binding: computed
    temperatureCelsius: function (diskId) {
      //noinspection JSUnresolvedFunction,JSUnresolvedVariable
      return ko.computed({
        read: function () {
          return DiskHelper.getTemperatureCelsius(this, diskId);
        }
      }, this);
    },

    // Called from binding: computed
    temperatureFahrenheit: function (diskId) {
      //noinspection JSUnresolvedFunction,JSUnresolvedVariable
      return ko.computed({
        read: function () {
          return DiskHelper.getTemperatureFahrenheit(this, diskId);
        }
      }, this);
    },

    // Called from binding: computed
    brand: function (driveModel) {
      //noinspection JSUnresolvedFunction,JSUnresolvedVariable
      return ko.computed({
        read: function () {
          return DiskHelper.extractBrand(driveModel);
        }
      }, this);
    },

    // Called from binding: computed
    global_status: function (diskId) {
      //noinspection JSUnresolvedFunction,JSUnresolvedVariable
      return ko.computed({
        read: function () //noinspection JSHint
        {
          var disk = this.disks()[diskId - 1];
          // To handle case of empty disk list in model (when refreshing).
          if (!disk) {
            return '';
          }

          /** @namespace disk.smart.i_status */
          return disk.smart.i_status;
        }
      }, this);
    },

    // Called from binding: computed
    tempStatus: function (diskId) {
      //noinspection JSUnresolvedFunction,JSUnresolvedVariable
      return ko.computed({
        read: function () {
          var disk = this.disks()[diskId - 1];
          // To handle case of empty disk list in model (when refreshing).
          if (!disk) {
            return '';
          }

          return disk.smart.items[8].status;
        }
      }, this);
    },

    // Called from binding: computed
    statusCssClass: function (status) {
      return Style.getStatusLabelCssClass(status);
    }
  };
});