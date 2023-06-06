const { config } = require("@swc/core/spack");
 
module.exports = config({
  entry: {
    init: __dirname + "/src/init.js",
    puzzle: __dirname + "/src/puzzle.js",
  },
  output: {
    path: __dirname + "/dist",
  },
});
