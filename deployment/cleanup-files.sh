#! /bin/bash

adapter_paths=("./cashbackplatform")

for path in ${adapter_paths[@]}; do
  echo "Deleting keystore, wallets and network config for: ${path}"
  rm -rf ${path}/wallet/admin/* \
      ${path}/wallet/user/* \
      ${path}/network-config/* \
      ${path}/certs/ca/* \
      ${path}/certs/orderer/* \
      ${path}/certs/peer/*
done
