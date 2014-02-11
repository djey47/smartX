#! /bin/sh
# Run script for deployment environment
echo Starting smartX web services...
nohup ruby ./smartx-services/rupees/smart_x.rb > smartx-services.log &
echo $! > smartx-services.pid
echo Logs: tail -f smartx-services.log