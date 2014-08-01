// This script provides function to retrieve configuration from a specific JSON file.
var SETTINGS = null;
var smartxSettings = {

	load : function() {
		$.ajax({
			url: 'conf/smartx.json',
            async: false,
            dataType: 'json',

			success: function (data) {
                /** @namespace data.webServicesPort */
                /** @namespace data.refreshIntervalSeconds */
                var port = data.webServicesPort;
  				var refreshIntervalSeconds = data.refreshIntervalSeconds;

  				SETTINGS = {
    				// URL of services (e.g pi-control module)
    				webServicesUrl: 'http://' + location.hostname + ':' + port,

    				// Refresh disk list every ? secs
					refreshIntervalSeconds: refreshIntervalSeconds
				};
			}
		});
	}
};