#docker rm -vf $(docker ps -aq)
docker rm -vf nandi-foods-web-app

#docker rmi -f $(docker images -aq)
docker rmi -f teenthofabud/nandi-foods-web-app:0.0.6-snapshot

npm run build:development

docker build -t teenthofabud/nandi-foods-web-app:0.0.6-snapshot --build-arg NODE_ENV=development -f Dockerfile .

docker run -p 80:80 -d --name nandi-foods-web-app teenthofabud/nandi-foods-web-app:0.0.6-snapshot