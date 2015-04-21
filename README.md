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

### From release

(for users).

Just download archive ( *Raw* button click ): **release/smartX-webapp-<version>.tar.gz** and extract it to a subdirectory (e.g smartX) to your NGINX root.

Please see *Running on a web server => Dedicated server* section below to set up NGINX server correctly.
 
And go to [this URL](http://localhost/smartX/smartx.html) with your favorite browser. That's all!

### From scratch

(for developers).

First you'll need to have **node.js**/**npm** and **yeoman** ready to go (see [website](http://yeoman.io)).

Also, make sure **ruby** and **compass** gem are correctly [installed](http://rvm.io/).

I assume you've cloned this git repository, already.

Then, from a console, issue following commands :

    cd <your git repos directory>/smartX/web-ui
    npm install
    bower install
    npm install -g grunt-cli
    grunt --force

... a **web-ui/dist** directory will be created, with all files required for website to run - except configuration that you'll need to include by yourself.

To configure this webapp, have a look at **web-ui/conf/smartx.json**:

    {
    	"description" : "Please modify below to (re)configure smartX",
    
    	"refreshIntervalSeconds" : "15"
    }

Next step is to deploy it on a web server instance.


Running on a web server
-----------------------

### Dedicated server ###

(for users).

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

