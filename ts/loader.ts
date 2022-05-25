import * as plugins from './plugins.js';
import type { CompilerOptions } from 'typescript';

const defaultTsNodeOptions: plugins.tsNode.CreateOptions = {
  compilerOptions: {
    lib: ['dom'],
    target: <any>'es2022', // Script Target should be a string -> 2 is for ES2015
    experimentalDecorators: true,
    useDefineForClassFields: false,
    esModuleInterop: true,
    strictNullChecks: false,
    moduleResolution: <any>'nodenext',
    module: <any>'ESNext',
    importsNotUsedAsValues: <any>'preserve',
  } as CompilerOptions,
  esm: true,
  skipIgnore: true,
  transpileOnly: true
};

export const { resolve, load, getFormat, transformSource } = plugins.tsNode.createEsmHooks(plugins.tsNode.register(defaultTsNodeOptions)) as any;