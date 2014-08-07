//noinspection JSUnresolvedVariable,JSUnresolvedFunction
var diskListViewModel = {
    refreshing: ko.observable(false),

    refreshFrequency: ko.observable('?'),

    refreshIntervalId: 0,

    disks: ko.observableArray([]),

    // Called from timer
    fetch: function() {
        diskListViewModel.refreshing(true);

        $.getJSON(smartxSettings.get().webServicesUrl + "/control/esxi/disks.json", function(diskListData) {
            diskListViewModel.refreshing(false);

            diskListViewModel.disks.removeAll();

            $.each(diskListData.disks, function(index, disk){

				//Request smart data for this disk
				$.getJSON(smartxSettings.get().webServicesUrl + "/control/esxi/disk/" + disk.id +"/smart.json", function(diskSmartData) {
					disk.smart = diskSmartData.smart;
				});

                diskListViewModel.disks.push(disk);
            });
        })
    },

    // Called from binding: click on row
    showSmartDetails: function(disk) {
        smartDetailsViewModel.items.removeAll();

		smartDetailsViewModel.get(disk);

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
    currentDisk: ko.observable({model: ''}),

    items: ko.observableArray([]),

    get: function(disk) {
		smartDetailsViewModel.currentDisk(disk);

		if (disk.smart != null) {
			$.each(disk.smart.items, function(index, item){
				smartDetailsViewModel.items.push(item);
			});
		}
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