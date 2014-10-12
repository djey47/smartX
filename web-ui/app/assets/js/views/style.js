/*
 * Returns CSS class to use when encountering specified SMART item status
 */
'use strict';

//noinspection JSUnresolvedVariable,JSUnresolvedFunction,JSHint
define([], function () {
  return {
    getStatusLabelCssClass: function (itemStatus) {

      var specializedClass;

      switch (itemStatus) {

        case 'OK' :
          specializedClass = 'label-success';
          break;

        case 'KO' :
          specializedClass = 'label-danger';
          break;

        case 'WARN' :
          specializedClass = 'label-warning';
          break;

        default:
          specializedClass = 'label-default';
      }

      return 'label ' + specializedClass;
    },

    /*
     * Returns status label to use when encountering specified status
     */
    getStatusLabelText: function (status) {

      switch (status) {

        case 'UNAVAIL' :
          return '?';

        default :
          return status;
      }
    }
  };
});