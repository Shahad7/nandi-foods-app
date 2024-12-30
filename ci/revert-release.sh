export NODE_VERSION=$(node -p -e "require('./package.json').version")

export VERSION=${NODE_VERSION}-rc

git tag -d ${VERSION}

git push --delete origin ${VERSION}