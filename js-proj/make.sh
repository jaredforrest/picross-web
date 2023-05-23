#!/bin/sh

FLASK_DIR="../flask/project"

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
#cp ./dist/init.js ./dist/index.js &&

# extra minify
#sed -i "$SED" dist/index.js

for file in template/*
do
#    sed  "$SED" "$file" > "dist/$(basename "$file")"
    cp "$file" "dist/$(basename "$file")"
done

# copy to server
mkdir -p $FLASK_DIR/static/css
mkdir -p $FLASK_DIR/app/static/js
cp dist/index.js $FLASK_DIR/static/js/index.js
cp dist/style.css $FLASK_DIR/static/css/style.css

mkdir -p ../flask/project/puzzles/templates
cp dist/*.html ../flask/project/puzzles/templates/

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
mkdir -p $FLASK_DIR/static/oldjs
mkdir -p $FLASK_DIR/static/oldcss
cp dist/index.js $FLASK_DIR/static/oldjs/index.js
cp dist/style.css $FLASK_DIR/static/oldcss/style.css
