smartX
======

Displays HDD's S.M.A.R.T. information from REST services.
In cases of virtualized environments, S.M.A.R.T information cannot be processed due to missing features in drivers; this project and pi-control (https://github.com/djey47/pi-control) aim at solving this.

Side note: smartX is just front side of a whole system. It needs to communicate with REST services (e.g pi-control) to get wanted data.

Modules:
--------
- web-ui : front-end to display usable and useful information about HDD status.
To be deployed on a web server : developed under nginx. Wroks with Apache as well.

To configure this webapp, have a look at **web-ui/conf/smartx.json**:

    {
    	"description" : "Please modify below to (re)configure smartX",
    
    	"webServicesPort" : "4601",
    	"refreshIntervalSeconds" : "15"
    }

Needed datasource:
------------------
This web app will send Ajax requests to following REST services (See [pi-control API](https://github.com/djey47/pi-control/wiki/API-reference)):

- hard disk list (id, model, size, device, i-status): **disks.json**
- detailed SMART status : set of indicators for a particular hard disk (id, label, threshold, value, worst): **disk/[disk id]/smart.json**

Target URL for REST services is as following : **http://[current hostname]:[webServicesPort]/control/esxi/[service]**

Front web server (development)
------------------------------
(nginx 1.5.10+)

Host configuration is as follows :

    root   /path/to/project/web-ui;
    location / {
        index index.html;
    }

To run server, execute following command :

    nginx

Then, send signals to handle it :

    nginx -s {stop|quit|reload|reopen}
