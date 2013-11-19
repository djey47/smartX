smartX
======

Gathers and display HDD's S.M.A.R.T. information from VMWare ESXi.

Modules:
--------
- smart-client : set of unix shell scripts and configuration to get S.M.A.R.T. information from ESXi system.

- web-services : REST web services to collect and provide S.M.A.R.T. information.
To start from command line, execute:
**ruby ./web-services/rupees/smart_x.rb**

- web-ui : front-end to display usable and useful information about HDD status.
To be deployed on a web server : developed and tested under classic apache server.

Ruby dependencies:
------------------
(core 2.0.0-p247)

- rack v1.5.2

- rack-protection v1.5.0

- rack-test v0.6.2

- sinatra v1.4.4

- test-unit v2.5.5

- tilt v1.4.1

