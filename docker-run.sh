#!/bin/bash

docker run -it --rm --env SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass -v "$PWD":/usr/src/app -w /usr/src/app  node:10 /bin/bash -c "yarn config set registry http://registry.npm.taobao.org/ && \
yarn && \
yarn build:prod && \
exit"
echo "dashboard build exit! continue to build bindata.go? yes/no"
read ok
if [ $ok != "yes" ] && [ $ok != "y" ];then
exit 0
fi
echo "continue to build bindata.go..."
docker run -it --rm -v "$PWD":/go/src/app -w /go/src/app golang:1.13 /bin/bash -c "go env -w GOPROXY=https://goproxy.io,direct && \
go get -u -v github.com/go-bindata/go-bindata/go-bindata && \
go get -u -v github.com/elazarl/go-bindata-assetfs/go-bindata-assetfs && \
go-bindata-assetfs -pkg middlewares -nocompress=false dist/... && \
exit"

echo "bindata.go build exit!"