#! /bin/bash

ADAPTER_PATH=$(pwd | sed 's/\/deployment/\t/g' | awk '{ print $1 }')

cd ${ADAPTER_PATH}/adapter

./build.sh

cd ../deployment
./start_all_component.sh

printf "\nDone!\n"
