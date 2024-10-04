How to Run?
- install Angular by "npm install @angular/cli -g"
- navigate to root folder
- execute "npm i -f"
- run the app using "ng serve -o"




### Docker local operations

```sh
docker build -t teenthofabud/apps/wizard/nandi-foods:v2 -f Dockerfile .
```

```sh
docker run -p 8080:8080 -d --name nandi-foods-v2 teenthofabud/apps/wizard/nandi-foods:v2
```

```sh
docker exec -it nandi-foods-v2 sh
```

DELETE ALL IMAGES
```sh
docker rmi -f $(docker images -aq)
```

DELETE ALL CONTAINERS
```sh
docker rm -vf $(docker ps -aq)
```
