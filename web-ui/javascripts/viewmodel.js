//noinspection JSUnresolvedVariable,JSUnresolvedFunction
var diskListViewModel = {
    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    lastReceived: ko.observable(''),

    refreshFrequency: ko.observable('?'),

    disks: ko.observableArray([]),

    fetch: function() {
        $.getJSON(SETTINGS.webServicesUrl + "/control/esxi/disks.json", function(data) {
            /** @namespace data.last_received */
//            diskListViewModel.lastReceived(data.last_received);

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
        smartDetailsViewModel.fetch();
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
    }
};

//noinspection JSUnresolvedFunction,JSUnresolvedVariable
var smartDetailsViewModel = {
    currentDisk: ko.observable({model: ''}),

    items: ko.observableArray([]),

    fetch: function() {
        $.getJSON(SETTINGS.webServicesUrl + "/control/esxi/disk/" + smartDetailsViewModel.currentDisk().id + "/smart.json", function(data) {
            smartDetailsViewModel.items.removeAll();
            $.each(data.smart.items, function(index, item){
                smartDetailsViewModel.items.push(item);
            });
        })
    }
};

//noinspection JSUnresolvedVariable,JSUnresolvedFunction
ko.applyBindings(diskListViewModel, $("#mainPage")[0]);
//noinspection JSUnresolvedVariable,JSUnresolvedFunction
ko.applyBindings(smartDetailsViewModel, $("#smartPopup")[0]);

// To refresh automatically
invokeAndRepeat(diskListViewModel.fetch, SETTINGS.refreshIntervalSeconds * 1000);

// Static values
diskListViewModel.refreshFrequency(SETTINGS.refreshIntervalSeconds)