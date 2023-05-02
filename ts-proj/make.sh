#!/bin/sh

SED='s/submit-button/b/g;
     s/grid-cell/c/g;
     s/empty/e/g;
     s/filled/f/g;
     s/grid-container/g/g;
     s/level-name/l/g;
     s/nono-grid/n/g;
     s/side-nums/s/g;
     s/top-nums/t/g;
     s/error-msg/v/g;'

# build
npm install
mkdir -p dist
npx ttsc && 
npx spack &&
npx terser --config-file terser.config.json -- ./dist/init.js > ./dist/index.js &&

# extra minify
sed -i "$SED" dist/index.js

for file in template/*
do
    sed  "$SED" "$file" > "dist/$(basename "$file")"
done

# copy to server
mkdir -p ../flask/app/static/css
mkdir -p ../flask/app/static/js
cp dist/index.js ../flask/app/static/js/index.js
cp dist/style.css ../flask/app/static/css/style.css

mkdir -p ../flask/app/templates
cp dist/*.html ../flask/app/templates/

# extra
npx brotli-cli compress dist/index.js

#make compat files
cp dist/index.js ../babelify/src/i
cat ../babelify/src/init.js dist/index.js > ../babelify/src/index.js

cd ../babelify || exit

npm install
mkdir -p dist
npx webpack
npx terser --config-file terser.config.json -- ./dist/init.js > ./dist/index.js &&

# copy to server
mkdir -p ../flask/app/static/js
cp dist/index.js ../flask/app/static/oldjs/index.js
