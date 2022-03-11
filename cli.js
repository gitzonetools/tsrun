#!/usr/bin/env node
process.env.CLI_CALL = 'true';
const cliTool = await import('./dist_ts/index.js');
cliTool.runCli();
