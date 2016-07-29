#! /bin/sh
sed -i "s/{{PI_CONTROL_SERVICES}}/${PI_CONTROL_ADDRESS}/" /etc/nginx/nginx.conf \
&& nginx \
&& tail -F /var/log/nginx/error.log
