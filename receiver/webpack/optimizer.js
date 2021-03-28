var NodeOptimizer = require("node-optimize")

var optimizer = new NodeOptimizer({
  ignore: ["configuration.js"],
})

var mergedJs = optimizer.merge("server.js")

require("fs").writeFile(
  require("path").resolve("../dist/server.optimized.js"),
  mergedJs,
)
