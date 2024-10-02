How to Run?
- Use vs code
- install the live server extension
- open the index.html file
- click on "go live" at the bottom right
Alternative:-
- simply opening the index.html file in your browser should also work




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
