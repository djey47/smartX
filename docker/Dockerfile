FROM resin/rpi-raspbian:jessie-20160622
LABEL multi.description="Image running smartX web interface on rPi" \
multi.version="1.0"
EXPOSE 80 

RUN apt update 
RUN apt install nginx
RUN apt install curl
RUN apt-get clean && apt-get autoclean

RUN curl -k -L https://github.com/djey47/smartX/raw/master/release/smartX-webapp-20141019.R1.08.tar.gz > /tmp/smartX.tar.gz

RUN mkdir -p /opt/smartX

RUN tar xzf /tmp/smartX.tar.gz -C /opt/smartX && rm /tmp/smartX.tar.gz

ADD server/default /etc/nginx/sites-enabled/
ADD server/start.sh /opt/

WORKDIR /opt/smartX
CMD ["/opt/start.sh"]
