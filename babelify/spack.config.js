const { config } = require("@swc/core/spack");
 
module.exports = config({
  entry: {
    init: __dirname + "/src/index.js",
  },
  output: {
    path: __dirname + "/dist",
  },
});
