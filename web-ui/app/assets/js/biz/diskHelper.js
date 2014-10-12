/*
 * Returns disk brand from full model information
 */
'use strict';

//noinspection JSUnresolvedVariable,JSUnresolvedFunction,JSHint
define([], function () {
  return {

    /*
     * Represents all known disk brands per initials
     */
    diskBrands: {
      HDS: 'HGST',
      ST: 'Seagate Technology',
      DT: 'Toshiba',
      WD: 'Western Digital',
      _: 'Unknown:'
    },

    extractBrand: function (diskModel) {
      var regex = /^([A-Z]+)[A-Z0-9]*$/;
      var brandInitials = diskModel.match(regex)[1];
      var diskBrand = this.diskBrands[brandInitials];

      if (diskBrand) {
        return diskBrand;
      } else {
        return this.diskBrands._ + brandInitials;
      }
    },

    /*
     * Provides normalized temperature from disk_id
     */
    getTemperatureNormalized: function (diskListViewModel, diskId) {

      var disk = diskListViewModel.disks()[diskId - 1];
      // To handle case of empty disk list in model (when refreshing).
      if (!disk) {
        return '';
      }

      // Item #8 is temperature according to ESXI... guaranteed ?
      return disk.smart.items[8].value;
    },

    /*
     * Provides temperature in Celsius degrees from disk_id
     */
    getTemperatureCelsius: function (diskListViewModel, diskId) {

      var disk = diskListViewModel.disks()[diskId - 1];
      // To handle case of empty disk list in model (when refreshing).
      if (!disk) {
        return '';
      }

      var tempValue = this.getTemperatureNormalized(diskListViewModel, diskId);
      var brand = this.extractBrand(disk.model);

      // WESTERN DIGITAL: 40C <=> 107N
      if (brand === this.diskBrands.WD) {
        tempValue = (tempValue * 40 / 107).toFixed(1);
      }

      return tempValue;
    },

    /*
     * Provides temperature in Fahrenheit degrees from disk_id
     */
    getTemperatureFahrenheit: function (diskListViewModel, diskId) {
      var tempCelsius = this.getTemperatureCelsius(diskListViewModel, diskId);

      return this.celsiusToFahrenheit(tempCelsius);
    },

    /*
     * Returns fahrenheit degrees temperature from celsius degrees.
     */
    celsiusToFahrenheit: function (celsiusTemp) {
      return (celsiusTemp * 1.8 + 32).toFixed(1);
    }
  };
});