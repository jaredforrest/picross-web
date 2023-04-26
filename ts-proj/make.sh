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
npx ttsc && 
npx spack &&
npx terser --config-file terser.config.json -- ./dist/init.js > ./dist/index.js &&

# extra minify
sed -i "$SED" dist/index.js

for file in template/*
do
    echo "$file"
    sed  "$SED" "$file" > "dist/$(basename "$file")"
done

# copy to server
cp dist/index.js ../flask2/app/static/js/index.js
cp dist/style.css ../flask2/app/static/css/style.css

#cp dist/index.html ../flask2/app/templates/index.html
#cp dist/new.html ../flask2/app/templates/new.html
cp dist/*.html ../flask2/app/templates/


# extra
npx brotli-cli compress dist/index.js
