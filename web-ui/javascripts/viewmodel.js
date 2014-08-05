//noinspection JSUnresolvedVariable,JSUnresolvedFunction
var diskListViewModel = {
    refreshing: ko.observable(false),

    refreshFrequency: ko.observable('?'),

    refreshIntervalId: 0,

    disks: ko.observableArray([]),

    // Called from timer
    fetch: function() {
        diskListViewModel.refreshing(true);
        $.getJSON(smartxSettings.get().webServicesUrl + "/control/esxi/disks.json", function(data) {
            diskListViewModel.refreshing(false);

            diskListViewModel.disks.removeAll();
            $.each(data.disks, function(index, disk){
                diskListViewModel.disks.push(disk);
            });
        })
    },

    // Called from binding: click on row
    showSmartDetails: function(disk) {
        smartDetailsViewModel.items.removeAll();
        smartDetailsViewModel.currentDisk(disk);

        // To refresh automatically
        smartDetailsViewModel.refreshIntervalId = invokeAndRepeat(smartDetailsViewModel.fetch, smartxSettings.get().refreshIntervalSeconds * 1000);

        $("#smartPopup").modal("show");
    },

    // Called from binding: computed
    temperature_fahrenheit: function (tempCelsius) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return ko.computed({
            read: function () {
                return celsiusToFahrenheit(tempCelsius);
            }
        }, this);
    },

	// Called from binding: computed
	brand: function(driveModel) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return ko.computed({
			read: function () {
				return extractBrand(driveModel);
			}
		}, this);
	}

};

//noinspection JSUnresolvedFunction,JSUnresolvedVariable
var smartDetailsViewModel = {
    refreshing: ko.observable(false),

    refreshIntervalId: 0,

    currentDisk: ko.observable({model: ''}),

    items: ko.observableArray([]),

    fetch: function() {
        smartDetailsViewModel.refreshing(true);

        $.getJSON(smartxSettings.get().webServicesUrl + "/control/esxi/disk/" + smartDetailsViewModel.currentDisk().id + "/smart.json", function(data) {
            /** @namespace data.smart */

            $.each(data.smart.items, function(index, item){
                smartDetailsViewModel.items.push(item);
            });

            smartDetailsViewModel.refreshing(false);
            smartDetailsViewModel.items.removeAll();
        })
    }
};

//noinspection JSUnresolvedVariable,JSUnresolvedFunction
ko.applyBindings(diskListViewModel, $("#mainPage")[0]);
//noinspection JSUnresolvedVariable,JSUnresolvedFunction
ko.applyBindings(smartDetailsViewModel, $("#smartPopup")[0]);

// Static values
diskListViewModel.refreshFrequency(smartxSettings.get().refreshIntervalSeconds);

// To refresh automatically
diskListViewModel.refreshIntervalId = invokeAndRepeat(diskListViewModel.fetch, smartxSettings.get().refreshIntervalSeconds * 1000);