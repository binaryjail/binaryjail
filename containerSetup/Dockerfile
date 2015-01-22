FROM ubuntu
MAINTAINER Andrey Turovsky <andrey@jisto.com>

ADD provision_container.sh /
RUN /provision_container.sh

RUN mkdir -p /root/.ssh
ADD dockerbox.pub /root/.ssh/authorized_keys
RUN chmod 600 /root/.ssh/authorized_keys
RUN chown root:root /root/.ssh/authorized_keys

EXPOSE 22

ENTRYPOINT ["sshd" "-d"]