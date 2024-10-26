docker rm -vf $(docker ps -aq)

docker rmi -f $(docker images -aq)

npm run build:staging

docker build -t teenthofabud/nandi-foods-web-app:0.0.5-rc --build-arg NODE_ENV=production -f Dockerfile .

docker run -p 80:80 -d --name nandi-foods-web-app teenthofabud/nandi-foods-web-app:0.0.5-rc
