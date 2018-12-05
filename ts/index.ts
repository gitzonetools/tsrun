import * as path from 'path';
import * as tsNode from 'ts-node';
import { CompilerOptions } from 'typescript';

const defaultTsNodeOptions: tsNode.Options = {
  compilerOptions: <CompilerOptions>{
    lib: ['es2016', 'es2017'],
    target: <any>'es2015', // Script Target should be a string -> 2 is for ES2015
    experimentalDecorators: true
  },
  skipIgnore: true,
  cacheDirectory: path.join(__dirname, '../tscache')
};

if (process.argv.includes('--web')) {
  const previousCompilerOptions = defaultTsNodeOptions.compilerOptions as CompilerOptions;
  defaultTsNodeOptions.compilerOptions = {
    ...previousCompilerOptions,
    lib: [previousCompilerOptions.lib, 'dom']
  }
}

if (process.argv.includes('--nocache')) {
  defaultTsNodeOptions.cache = false;
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
