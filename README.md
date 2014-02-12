smartX
======

Displays HDD's S.M.A.R.T. information from Synology DSM systems.
In cases of virtualized environments, S.M.A.R.T information cannot be processed due to missing features in drivers; this project aims at solving this.

Modules:
--------
- web-services : REST web services to provide S.M.A.R.T. information.
Current TCP port is 4600.

To start from command line, execute:
**ruby ./web-services/rupees/smart_x.rb**

To test services, execute :
**ruby ./web-services/tests/services_test.rb**

- web-ui : front-end to display usable and useful information about HDD status.
To be deployed on a web server : developed under nginx, deployed under apache.

Ruby dependencies:
------------------
(core 2.0.0-p247)

Runtime gems:
- sinatra v1.4.4
  - rack v1.5.2
  - tilt v1.4.1
  - rack-protection v1.5.0

Testing gems:
- test-unit v2.5.5
- minitest v5.2.3

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


