var diskListViewModel = {

    // Attributes
    lastReceived: ko.observable(''),

    disks: ko.observableArray(new Array()),

    // Methods
    fetch: function() {
        $.getJSON("http://localhost:4600/disks.json", function(data) {
            diskListViewModel.lastReceived(data.last_received);

            $.each(data.disks, function(index, disk){
                diskListViewModel.disks.push(disk);
            });
        })
    },

    showSmartDetails: function() {
        $("#smartPopup").modal("show");
    }
};

ko.applyBindings(diskListViewModel);

// TODO refresh automatically
diskListViewModel.fetch();



