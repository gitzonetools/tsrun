import * as tsNode from 'ts-node';
import * as path from 'path';

tsNode.register({
  compilerOptions: {
    lib: [ 'es2016', 'es2017' ]
  }
});

if (process.env.CLI_CALL) {
  const pathToLoad = path.join(process.cwd(), process.argv.pop());
  import(pathToLoad);
}
