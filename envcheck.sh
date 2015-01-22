#!/usr/bin/env bash

JAIL_DIR=$(cd `dirname "${BASH_SOURCE[0]}"` && pwd)
WORKING_DIR=$(pwd)
FILENAME="${0##*/}"

#This file check everything that needs to work properly
#for binaryjail to run and 

docker version 1>/dev/null

if [[ $? != 0 ]]
then
        echo "Docker not found in PATH! Running installer..."
        cd $JAIL_DIR/containerSetup
        ./build.sh
        exit 1
fi

docker inspect dockerbox/base 1>/dev/null
if [[ $? != 0 ]]
then
        echo "BinaryJail doesn't seem to be installed. Running installer..."
        cd $JAIL_DIR/containerSetup
        ./build.sh
        exit 1
fi