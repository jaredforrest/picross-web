const { config } = require("@swc/core/spack");
 
module.exports = config({
  entry: {
    init: __dirname + "/builds/init.js",
  },
  output: {
    path: __dirname + "/dist",
  },
});
