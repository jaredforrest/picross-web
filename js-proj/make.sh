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
mkdir -p ../babelify/templates
cp dist/style.css ../babelify/templates
cat ../babelify/src/init.js dist/index.js > ../babelify/src/index.js

cd ../babelify || exit

npm install
mkdir -p dist
npx webpack
npx terser --config-file terser.config.json -- ./dist/init.js > ./dist/index.js
#cp ./dist/init.js ./dist/index.js

# now the css
npx postcss --use postcss-css-variables -o dist/style.css templates/style.css

# copy to server
mkdir -p ../flask/app/static/oldjs
mkdir -p ../flask/app/static/oldcss
cp dist/index.js ../flask/app/static/oldjs/index.js
cp dist/style.css ../flask/app/static/oldcss/style.css
