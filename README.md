smartX
======

Displays HDD's S.M.A.R.T. information from REST services.
In cases of virtualized environments, S.M.A.R.T information cannot be processed due to missing features in drivers; this project and pi-control (https://github.com/djey47/pi-control) aim at solving this.

Side note: smartX is just front side of a whole system. It needs to communicate with REST services (e.g pi-control) to get wanted data.

Modules:
--------
- web-ui : front-end to display usable and useful information about HDD status.
To be deployed on a web server : developed under nginx. Wroks with Apache as well.

To configure this webapp, have a look at **javascripts/settings.js**:

    // Please modify this file to (re)configure smartX
    var SETTINGS = {
        // URL of services (e.g pi-control module)
        webServicesUrl: 'http://' + location.hostname + ':4600',
    
        // Refresh disk list every ? secs
        refreshIntervalSeconds: 15
    };

Needed datasources:
-------------------
- hard disk list (id, model, size, device, i-status)
- detailed SMART status : set of indicators for a particular hard disk (id, label, threshold, value, worst)

Front web server (development)
------------------------------
(nginx 1.5.10)

Host configuration is as follows :

    root   /path/to/project/web-ui;
    location / {
        index  smartx.html;
    }

To run server, execute following command :

    nginx

Then, send signals to handle it :

    nginx -s {stop|quit|reload|reopen}