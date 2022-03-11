#!/usr/bin/env node
process.env.CLI_CALL = 'true';
await import('@gitzone/tsrun');
const cliTool = await import('./ts/index.js');
cliTool.runCli();
