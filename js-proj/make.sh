#!/bin/sh

FLASK_DIR="../flask/project"

# make dist just in case
mkdir -p dist

npm run build

# copy to server
mkdir -p $FLASK_DIR/static/css
mkdir -p $FLASK_DIR/static/js
cp dist/index.js $FLASK_DIR/static/js/index.js
cp template/style.css $FLASK_DIR/static/css/style.css

mkdir -p $FLASK_DIR/puzzles/templates
cp template/*.html $FLASK_DIR/puzzles/templates/

#make compat files
mkdir -p ../babelify/template
cp template/style.css ../babelify/template
cat ../babelify/src/init.js dist/index.js > ../babelify/src/index.js

cd ../babelify || exit

mkdir -p dist
npm run build

# copy to server
mkdir -p $FLASK_DIR/static/oldjs
mkdir -p $FLASK_DIR/static/oldcss
cp dist/index.js $FLASK_DIR/static/oldjs/index.js
cp dist/style.css $FLASK_DIR/static/oldcss/style.css
