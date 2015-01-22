#!/usr/bin/env bash

#Update the distribution
sudo apt-get update
sudo apt-get -y upgrade

#Install and configure ssh server
sudo apt-get install -y openssh-server
mkdir -p /var/run/sshd
echo 'root:root' | chpasswd
sed -i "s/PermitRootLogin without-password/PermitRootLogin yes/" /etc/ssh/sshd_config
#http://stackoverflow.com/questions/18173889/cannot-access-centos-sshd-on-docker
sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config
sed -ri 's/#UsePAM no/UsePAM no/g' /etc/ssh/sshd_config

#Install debug tools
sudo apt-get install -y time \
						git  \
						curl \
						wget \
						light-themes #http://superuser.com/questions/605378/gtk-apps-from-remote-server-look-bad