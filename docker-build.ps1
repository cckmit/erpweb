$registry="192.168.1.118:5000"
$version="prod"
$imagename="devotion-ui"

if ($args.Count -ne 0) {
    $version = $args
}

Write-Host $version

docker build --build-arg version=$version -t $registry/sentel/${imagename}:$version .

docker push $registry/sentel/${imagename}:$version