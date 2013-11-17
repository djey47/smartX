var diskListViewModel = {

    // Attributes
    lastReceived: ko.observable(''),
    disks: new Array(),

    // Methods
    fetch: function() {
        $.getJSON("http://localhost:4600/disks.json", function(data) {
            diskListViewModel.lastReceived(data.last_received);
        })
    }
};

ko.applyBindings(diskListViewModel);

// TODO refresh automatically
diskListViewModel.fetch();



