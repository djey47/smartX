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

        //Builds disk list for SMART request
        var diskIds = '';

        diskListData.disks.forEach(function (disk, i, disks) {

          var diskId = i + 1;

          diskIds = diskIds.concat(diskId);

          if (diskId < disks.length) {
            diskIds = diskIds.concat(',');
          }

        });

        if (diskIds !== '') {
          //Requests SMART data for these disks
          //noinspection JSUnresolvedFunction
          $.getJSON(Settings.get().webServicesUrl + 'esxi/disks/' + diskIds + '/smart.json', function (diskSmartData) {

            //noinspection JSUnresolvedFunction
            DiskListViewModel.disks.removeAll();

            //noinspection JSHint,JSUnresolvedFunction
            /** @namespace diskSmartData.disks_smart */
            diskSmartData.disks_smart.forEach(function (smartData, i) {
              var disk = diskListData.disks[i];
              disk.smart = smartData.smart;

              //Updates model with disk list
              DiskListViewModel.disks.push(disk);
            });
          });
        }

        DiskListViewModel.refreshing(false);
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
    temperature: function (diskId) {
      //noinspection JSUnresolvedFunction,JSUnresolvedVariable
      return ko.computed({
        read: function () {
          var temperatureCelsius = DiskHelper.getTemperatureCelsius(this, diskId);

          if (temperatureCelsius !== DiskHelper.NOT_AVAILABLE_VALUE) {
            var temperatureFahrenheit = DiskHelper.getTemperatureFahrenheit(this, diskId);
            return Math.floor(temperatureCelsius) + '°C / ' + Math.floor(temperatureFahrenheit) + '°F';
          }

          return DiskHelper.NOT_AVAILABLE_VALUE;
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

          /** @namespace disk.smart.items[].status */
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