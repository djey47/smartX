// This script provides function to retrieve configuration from a specific JSON file.
// Use get() function to lazy load settings
var smartxSettings = {

	settings:null,

	// Loads (when needed) and returns settings
	get:function() {

		if (smartxSettings.settings == null) {
			smartxSettings.load();
		}

		return smartxSettings.settings;
	},

	load:function() {
		$.ajax({
			url: 'conf/smartx.json',
			async: false,
			dataType: 'json',

			success: function (data) {
				/** @namespace data.webServicesPort */
				/** @namespace data.refreshIntervalSeconds */
				smartxSettings.settings = {
					// URL of services (e.g pi-control module)
					webServicesUrl: 'http://' + location.host + '/pi-control/',

					// Refresh disk list every ? secs
					refreshIntervalSeconds: data.refreshIntervalSeconds
				};
			}
		});
	}
};