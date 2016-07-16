#! /bin/sh
sed -i "s/{{PI_CONTROL_SERVICES}}/${PI_CONTROL_ADDRESS}/" /etc/nginx/sites-enabled/default \
&& sudo service nginx start \
&& tail -F /var/log/nginx/error.log
