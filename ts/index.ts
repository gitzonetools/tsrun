import * as tsNode from 'ts-node';
import * as path from 'path';

tsNode.register({
  compilerOptions: {
    lib: [ 'es2016', 'es2017' ]
  }
});

if (process.env.CLI_CALL) {
  // contents of argv array
  // process.argv[0] -> node Executable
  // process.argv[1] -> tsrun executable
  const pathToTsFile = process.argv[2]
  
  const pathToLoad = path.join(process.cwd(), pathToTsFile);
  import(pathToLoad);
}
