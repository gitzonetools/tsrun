import * as plugins from './plugins.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const runCli = async () => {
  // contents of argv array
  // process.argv[0] -> node Executable
  // process.argv[1] -> tsrun executable
  const pathToTsFile = process.argv[2];
  
  const tsNodeLoaderPath = plugins.path.join(__dirname, 'loader.js')
  const pathToLoad = plugins.path.join(process.cwd(), pathToTsFile);
  process.argv.splice(0, 3); // this ensures transparent arguments for the child process
  
  const smartshellInstance = new plugins.smartshell.Smartshell({
    executor: 'bash'
  });

  smartshellInstance.exec(`node --loader ${tsNodeLoaderPath} ${pathToLoad} ${process.argv.length > 0 ? process.argv.reduce((prevArg, currentArg) => {
    return prevArg + ' ' + currentArg;
  }) : ''}`);

};
