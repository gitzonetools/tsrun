import * as plugins from './plugins.js';
const __dirname = plugins.path.dirname(plugins.url.fileURLToPath(import.meta.url));

export const runPath = async (pathArg: string, fromFileUrl?: string) => {
  pathArg = fromFileUrl
    ? plugins.path.join(plugins.path.dirname(plugins.url.fileURLToPath(fromFileUrl)), pathArg)
    : pathArg;
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

  // we want to have command line arguments available in the child process.
  // when we have a path sepcified through a function there is one argeument less to pay respect to.
  // thus when pathArg is specifed -> we only splice 2
  pathArg? process.argv.splice(0, 2) : process.argv.splice(0, 3); // this ensures transparent arguments for the child process

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
