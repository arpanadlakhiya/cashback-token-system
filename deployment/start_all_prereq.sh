#! /bin/bash

ADAPTER_PATH=../adapter
adapter_path=("./cashbackplatform")
echo $adapter_path
# update db scripts
for path in ${adapter_path[@]}; do
echo "-------------------------------------------------"
echo $path
  cd ${path}
  sh copy_certs.sh
  sh deployment/set_env_vars.sh
  sh start-prereq.sh &
  cd ..
done

sleep 50

echo "ok to kill"
