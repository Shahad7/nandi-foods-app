export NODE_VERSION=$(node -p -e "require('./package.json').version")

export VERSION=${NODE_VERSION}-rc

docker rm -vf nandi-foods-web-app

docker rmi -f teenthofabud/nandi-foods-web-app:${VERSION}

npm run build:staging

docker build -t teenthofabud/nandi-foods-web-app:${VERSION} --build-arg NODE_ENV=production -f Dockerfile .

docker image push teenthofabud/nandi-foods-web-app:${VERSION}

docker pull docker.io/teenthofabud/nandi-foods-web-app:${VERSION}

git pull

git tag ${VERSION} -a -m "Release version ${VERSION}"

git push origin ${VERSION}