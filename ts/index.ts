import * as plugins from './plugins.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const runPath = async (pathArg: string) => {
  await runCli(pathArg);
};

export const runCli = async (pathArg?: string) => {
  // contents of argv array
  // process.argv[0] -> node Executable
  // process.argv[1] -> tsrun executable
  const relativePathToTsFile = pathArg ? pathArg : process.argv[2];
  const absolutePathToTsFile = plugins.path.isAbsolute(relativePathToTsFile)
    ? relativePathToTsFile
    : plugins.path.join(process.cwd(), relativePathToTsFile);

  process.argv.splice(0, 3); // this ensures transparent arguments for the child process

  // lets setup things for execution
  const smartshellInstance = new plugins.smartshell.Smartshell({
    executor: 'bash',
  });

  const tsNodeLoaderPath = plugins.path.join(__dirname, 'loader.js');
  // note: -> reduce on emtpy array does not work
  // thus check needed before reducing the argv array
  smartshellInstance.exec(
    `node --loader ${tsNodeLoaderPath} ${absolutePathToTsFile} ${
      process.argv.length > 0
        ? process.argv.reduce((prevArg, currentArg) => {
            return prevArg + ' ' + currentArg;
          })
        : ''
    }`
  );
};
