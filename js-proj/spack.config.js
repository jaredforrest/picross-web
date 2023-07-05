const { config } = require("@swc/core/spack");
 
module.exports = config({
  entry: {
    init: __dirname + "/src/init.js",
    puzzle: __dirname + "/src/puzzle.js",
    puzzleList: __dirname + "/src/puzzleList.js",
  },
  output: {
    path: __dirname + "/dist",
  },
});
