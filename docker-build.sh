#!/bin/bash

registry="192.168.1.118:5000"
#registry="39.100.119.145:5000"
version="prod"
imagename="devotion-ui"

if [ -n "$1" ]; then
    version=$1
fi
yarn build:$version

docker build --build-arg version=$version -t $registry/sentel/$imagename:$version .

docker push $registry/sentel/$imagename:$version