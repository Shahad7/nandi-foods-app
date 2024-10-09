### Docker local operations

#### QA

```sh
docker build -t teenthofabud/apps/wizard/nandi-foods-web-app:0.0.1-rc --build-arg NODE_ENV=staging -f Dockerfile .


docker run -p 8080:8080 -d --name nandi-foods-web-app teenthofabud/apps/wizard/nandi-foods-web-app:0.0.1-rc
```

#### Development

```sh
docker build -t teenthofabud/apps/wizard/nandi-foods-web-app:0.0.1-snaphost --build-arg NODE_ENV=development -f Dockerfile .

docker run -p 8080:8080 -d --name nandi-foods-web-app teenthofabud/apps/wizard/nandi-foods-web-app:0.0.1-snapshot
```


```sh
docker exec -it nandi-foods-web-app sh
```

DELETE ALL IMAGES

```sh
docker rmi -f $(docker images -aq)
```

DELETE ALL CONTAINERS

```sh
docker rm -vf $(docker ps -aq)
```


### NPM build

```sh
npm run build:staging
```