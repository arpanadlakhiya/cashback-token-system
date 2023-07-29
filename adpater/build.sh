#!/bin/bash

echo -e "\nCompiling typescript code..."

npm run build

if [[ $? -ne 0 ]]; then
  exit 1
fi

echo -e "Building image...\n"

DOCKER_BUILDKIT=1 docker build -f Dockerfile -t cashback-token-system:latest .

if [[ $? -ne 0 ]]; then
  exit 1
fi

echo -e "\nDone!\n"