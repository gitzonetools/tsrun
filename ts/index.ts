import * as path from "path";
import * as tsNode from "ts-node";

const tsCacheDir = path.join(__dirname, "../tscache");

const defaultTsNodeOptions: tsNode.Options = {
  compilerOptions: {
    lib: ["es2016", "es2017"],
    target: "es2015"
  },
  skipIgnore: true,
  cacheDirectory: tsCacheDir
};

// check wether a cache is feasible
if (process.argv.includes("--nocache")) {
  defaultTsNodeOptions.cache = false;
} else {
  var fs = require('fs');
  fs.access(tsCacheDir, fs.constants.W_OK, function(err) {
    if (err) {
      defaultTsNodeOptions.cache = false;
    }
  });
}

tsNode.register(defaultTsNodeOptions);

if (process.env.CLI_CALL_TSRUN) {
  // contents of argv array
  // process.argv[0] -> node Executable
  // process.argv[1] -> tsrun executable
  const pathToTsFile = process.argv[2];

  const pathToLoad = path.join(process.cwd(), pathToTsFile);
  import(pathToLoad);
}
