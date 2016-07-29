smartX
======

[![Build Status](https://travis-ci.org/djey47/smartX.svg?branch=master)](https://travis-ci.org/djey47/smartX)

Displays HDD's S.M.A.R.T. information from REST services.
In cases of virtualized environments, S.M.A.R.T information cannot be processed due to missing features in drivers; this project and pi-control (https://github.com/djey47/pi-control) aim at solving this.

Side note: smartX is just front side of a whole system. It needs to communicate with REST services (e.g pi-control) to get wanted data.

Modules:
--------
**web-ui** is a front-end to display useful information about HDD status.

To be deployed on a web server (developed under compass + nginx).

Screenshots: 

![Disk list](https://github.com/djey47/smartX/blob/master/web-ui/screens/disk_list.png)

![Smart Info](https://github.com/djey47/smartX/blob/master/web-ui/screens/smart_info.png)


Needed datasource:
------------------
This web app will send Ajax requests to following REST services (see [pi-control API](https://github.com/djey47/pi-control/wiki/API-reference)):

Target URL for REST services is as following : 
**http://[current host]/pi-control/[service]**

Link to services is achieved by nginx, as reverse-proxy. Corresponding configuration is as described in **server/site.default** file.   

Here is a service overview:

- hard disk list (id, model, size, device, i-status): **esxi/disks.json**
- detailed SMART status : set of indicators for a particular hard disk (id, label, threshold, value, worst): **esxi/disk/[disk id]/smart.json**


Installing
----------

See [WIKI](https://github.com/djey47/smartX/wiki/Installing)


Running on a web server (if not using Docker image)
---------------------------------------------------

### Classical, dedicated server ###

(developed and tested onto [NGINX](http://nginx.org/) 1.5.10+)

Server configuration is as described in **server/site.default** file.

To run server, execute following command :

    nginx

Then, send signals to handle it :

    nginx -s {stop|quit|reload|reopen}

### Embedded server (with stubbed services) ###

(for developers).

Type-in following command in terminal:

	cd <your git repos directory>/smartX/web-ui	
	grunt serve
	
... a web server will be started with all required data sources as stubs.
 
Stubs are located in **web-ui/app/pi-control**  and may be modified to suit your needs.

