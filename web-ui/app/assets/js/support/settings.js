// This script provides function to retrieve configuration from a specific JSON file.
// Use get() function to lazy load settings
'use strict';

define([	'jquery'
		], function ($) {
			
	return {
		settings:null,

		// Loads (when needed) and returns settings
		get:function() {
			if (this.settings == null) {
				this.load();
			}

			return this.settings;
		},

		load:function() {
			var Settings = this;

			$.ajax({
				url: 'conf/smartx.json',
				async: false,
				dataType: 'json',

				success: function (data) {
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