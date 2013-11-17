//noinspection JSUnresolvedVariable,JSUnresolvedFunction
var diskListViewModel = {

    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    lastReceived: ko.observable(''),

    disks: ko.observableArray([]),

    fetch: function() {
        $.getJSON("http://localhost:4600/disks.json", function(data) {
            /** @namespace data.last_received */
            diskListViewModel.lastReceived(data.last_received);

            $.each(data.disks, function(index, disk){
                diskListViewModel.disks.push(disk);
            });
        })
    },

    // Called from binding: click
    showSmartDetails: function() {
        $("#smartPopup").modal("show");
    }
};

//noinspection JSUnresolvedVariable,JSUnresolvedFunction
ko.applyBindings(diskListViewModel);

// TODO refresh automatically
diskListViewModel.fetch();



