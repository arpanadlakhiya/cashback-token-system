#! /bin/bash

ADAPTER_PATH=../adapter
adapter_path=("./platform" "./amazon" "./flipkart" "./misho" "./myntra")

# update db scripts
for path in ${adapter_path[@]}; do
  cd ${path}
  sh start-components.sh
  cd ..
done

