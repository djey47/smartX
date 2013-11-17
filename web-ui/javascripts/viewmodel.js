//noinspection JSUnresolvedVariable,JSUnresolvedFunction
var diskListViewModel = {
    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    lastReceived: ko.observable(''),

    disks: ko.observableArray([]),

    fetch: function() {
        $.getJSON(WEB_SERVICES_URL + "/disks.json", function(data) {
            /** @namespace data.last_received */
            diskListViewModel.lastReceived(data.last_received);

            diskListViewModel.disks.removeAll();
            $.each(data.disks, function(index, disk){
                diskListViewModel.disks.push(disk);
            });
        })
    },

    // Called from binding: click on row
    showSmartDetails: function(disk) {
        smartDetailsViewModel.currentDisk(disk);
        smartDetailsViewModel.fetch();
        $("#smartPopup").modal("show");
    }
};

var smartDetailsViewModel = {
    currentDisk: ko.observable({model: ''}),

    items: ko.observableArray([]),

    fetch: function() {
        $.getJSON(WEB_SERVICES_URL + "/smart.json/" + smartDetailsViewModel.currentDisk().id, function(data) {
            smartDetailsViewModel.items.removeAll();
            $.each(data.items, function(index, item){
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
invokeAndRepeat(diskListViewModel.fetch, REFRESH_INTERVAL_SECS * 1000);