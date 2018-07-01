import * as path from 'path';
import * as tsNode from './tsnode';

tsNode.register({
  compilerOptions: {
    lib: [ 'es2016', 'es2017' ]
  },
  skipIgnore: true,
  cacheDirectory: path.join(__dirname, '../tscache')
});

if (process.env.CLI_CALL_TSRUN) {
  // contents of argv array
  // process.argv[0] -> node Executable
  // process.argv[1] -> tsrun executable
  const pathToTsFile = process.argv[2]
  
  const pathToLoad = path.join(process.cwd(), pathToTsFile);
  import(pathToLoad);
}
