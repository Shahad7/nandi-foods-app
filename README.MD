
## Build

### Development

```sh
npm run build:development

docker build -t teenthofabud/nandi-foods-web-app:0.0.4-snapshot --build-arg NODE_ENV=development -f Dockerfile .

docker run -p 80:80 -d --name nandi-foods-web-app teenthofabud/nandi-foods-web-app:0.0.4-snapshot

```

### Staging

```sh
npm run build:staging

docker build -t teenthofabud/nandi-foods-web-app:0.0.4-rc --build-arg NODE_ENV=production -f Dockerfile .

docker run -p 80:80 -d --name nandi-foods-web-app teenthofabud/nandi-foods-web-app:0.0.4-rc

docker image push teenthofabud/nandi-foods-web-app:0.0.4-rc

docker pull docker.io/teenthofabud/nandi-foods-web-app:0.0.4-rc
```

## Run

### Locally

```sh
docker exec -it nandi-foods-web-app sh
```

## Cleanup

### Delete all images

```sh
docker rmi -f $(docker images -aq)
```

### Delete all containers

```sh
docker rm -vf $(docker ps -aq)
```
