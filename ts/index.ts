import * as path from 'path';
import * as tsNode from 'ts-node';
import { CompilerOptions } from 'typescript';

const defaultTsNodeOptions: tsNode.CreateOptions = {
  compilerOptions: {
    lib: ['es2017'],
    target: <any>'es2017', // Script Target should be a string -> 2 is for ES2015
    experimentalDecorators: true,
    esModuleInterop: true,
  } as CompilerOptions,
  skipIgnore: true,
};

if (process.argv.includes('--web')) {
  const previousCompilerOptions = defaultTsNodeOptions.compilerOptions as CompilerOptions;
  defaultTsNodeOptions.compilerOptions = {
    ...previousCompilerOptions,
    lib: ['es2016', 'es2017', 'dom'],
    target: <any>'es2017', // Script Target should be a string -> 2 is for ES2015
  };
}

if (process.argv.includes('--nocache')) {
  // currently caching is not used
}

tsNode.register(defaultTsNodeOptions);

export const runCli = async () => {
  // contents of argv array
  // process.argv[0] -> node Executable
  // process.argv[1] -> tsrun executable
  const pathToTsFile = process.argv[2];

  const pathToLoad = path.join(process.cwd(), pathToTsFile);
  process.argv.shift();
  import(pathToLoad);
};
