//noinspection JSUnresolvedVariable,JSUnresolvedFunction
var diskListViewModel = {
    refreshing: ko.observable(false),

    refreshFrequency: ko.observable('?'),

    refreshIntervalId: 0,

    disks: ko.observableArray([]),

    // Called from timer
    fetch: function() {
        diskListViewModel.refreshing(true);

		//Requests disk list
        $.getJSON(smartxSettings.get().webServicesUrl + "/control/esxi/disks.json", function(diskListData) {
			diskListViewModel.refreshing(false);

            diskListViewModel.disks.removeAll();

			var disk_ids = "";
			$.each(diskListData.disks, function(index, disk) {
				//Builds disk list for SMART resquest
				disk_ids = disk_ids.concat((index+1).toString());

				if (index < diskListData.disks.length - 1) {
					disk_ids = disk_ids.concat(',');
				}

				//Updates model with disk list
				diskListViewModel.disks.push(disk);
			});

			//Requests SMART data for these disks
			$.getJSON(smartxSettings.get().webServicesUrl + "/control/esxi/disks/" + disk_ids +"/smart.json", function(diskSmartData) {
				/** @namespace diskSmartData.disks_smart */
				$.each(diskSmartData.disks_smart, function(index, smartData){
					//Updates model with SMART data
					/** @namespace smartData.disk_smart */
					diskListViewModel.disks()[index].smart = smartData.disk_smart;
					diskListViewModel.disks.valueHasMutated();
				});
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