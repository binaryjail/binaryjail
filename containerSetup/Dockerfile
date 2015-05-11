FROM ubuntu
MAINTAINER Andrey Turovsky <andrey@jisto.com>

#Install Node.JS
RUN sudo apt-get install -y software-properties-common && \
	sudo add-apt-repository -y ppa:chris-lea/node.js && \
	sudo apt-get update && \
	sudo apt-get install -y nodejs

ADD provision_container.sh /
RUN /provision_container.sh

RUN mkdir -p /root/.ssh
ADD dockerbox.pub /root/.ssh/authorized_keys
RUN chmod 600 /root/.ssh/authorized_keys
RUN chown root:root /root/.ssh/authorized_keys

ADD restserver.js /
RUN npm install restify
ADD runrest.sh /
ADD test.sh /

EXPOSE 22

#ENTRYPOINT ["sshd" "-d"]
ENTRYPOINT ["/runrest.sh"]