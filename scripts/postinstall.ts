// This file takes care of some postinstall actions like clearing the TypeScript cache.
import * as smartfile from 'smartfile';
import * as path from 'path';

const run = async () => {
  const tsCacheDir = path.join(__dirname, '../tscache');
  await smartfile.fs.ensureEmptyDir(tsCacheDir);
}

run()
