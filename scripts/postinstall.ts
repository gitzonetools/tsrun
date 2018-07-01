// This file takes care of some postinstall actions like clearing the TypeScript cache.
import * as smartfile from 'smartfile';
import * as path from 'path';

const run = async () => {
  const tsCacheDir = path.join(__dirname, '../tscache');
  const tsCacheFiles: string[] = await smartfile.fs.listFolders(tsCacheDir) as any;
  for(const dir of tsCacheFiles) {
    console.log(`Removing cache directory ${dir}`);
    let dirToRemove = path.join(tsCacheDir, dir);
    await smartfile.fs.removeSync(dirToRemove);
  }
}

run()
