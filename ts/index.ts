import * as path from 'path';
import * as tsNode from 'ts-node';
import { CompilerOptions } from 'typescript';

const defaultTsNodeOptions: tsNode.CreateOptions = {
  compilerOptions: {
    lib: ['dom'],
    target: <any>'es2020', // Script Target should be a string -> 2 is for ES2015
    experimentalDecorators: true,
    esModuleInterop: true,
    strictNullChecks: false,
    moduleResolution: <any>'node12',
    module: <any>'es2020',
    importsNotUsedAsValues: <any>'preserve',
  } as CompilerOptions,
  skipIgnore: true,
};

tsNode.register(defaultTsNodeOptions);

export const runCli = async () => {
  // contents of argv array
  // process.argv[0] -> node Executable
  // process.argv[1] -> tsrun executable
  const pathToTsFile = process.argv[2];

  const pathToLoad = path.join(process.cwd(), pathToTsFile);
  process.argv.splice(2, 1);
  // console.log(process.argv);
  import(pathToLoad);
};
