#!/usr/bin/env bash

#Check docker install
DOCKER=$(which docker)
if [ -z "$DOCKER" ]
then
	echo "Docker not found... Press Enter to install (requires admin privileges), ctrl-c to quit:"
	read line
	sudo apt-get update && sudo apt-get install -y docker.io
else
	echo "Found docker at $DOCKER..."
fi

#Check ssh key
SSH_KEY=$HOME/.ssh/dockerbox.pub
if [ -f $SSH_KEY ] && [ "`ssh-keygen -l -f $SSH_KEY | grep \"^[0-9]\+\"`" ]
then
	echo "Dockerbox keypair found at $SSH_KEY..."
	cp $SSH_KEY .
else 
	echo "Dockerbox keypair not found at $SSH_KEY. Creating..."
	ssh-keygen -t rsa -f $SSH_KEY -P ""
	echo "Created..."
fi

#Build container
docker build --rm=true -t dockerbox/base .
echo "Installed BinaryJail! Please re-run your command."