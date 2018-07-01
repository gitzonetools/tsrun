"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const os_1 = require("os");
const sourceMapSupport = require("source-map-support");
const mkdirp = require("mkdirp");
const crypto = require("crypto");
const yn = require("yn");
const arrify = require("arrify");
const bufferFrom = require("buffer-from");
const make_error_1 = require("make-error");
const util = require("util");
/**
 * @internal
 */
exports.INSPECT_CUSTOM = util.inspect.custom || 'inspect';
/**
 * Debugging `ts-node`.
 */
const shouldDebug = yn(process.env.TS_NODE_DEBUG);
const debug = shouldDebug ? console.log.bind(console, 'ts-node') : () => undefined;
const debugFn = shouldDebug ?
    (key, fn) => {
        return (x) => {
            debug(key, x);
            return fn(x);
        };
    } :
    (_, fn) => fn;
/**
 * Export the current version.
 */
exports.VERSION = require('../package.json').version;
/**
 * Default register options.
 */
exports.DEFAULTS = {
    files: yn(process.env['TS_NODE_FILES']),
    cache: yn(process.env['TS_NODE_CACHE'], { default: true }),
    pretty: yn(process.env['TS_NODE_PRETTY']),
    cacheDirectory: process.env['TS_NODE_CACHE_DIRECTORY'],
    compiler: process.env['TS_NODE_COMPILER'],
    compilerOptions: parse(process.env['TS_NODE_COMPILER_OPTIONS']),
    ignore: split(process.env['TS_NODE_IGNORE']),
    project: process.env['TS_NODE_PROJECT'],
    skipIgnore: yn(process.env['TS_NODE_SKIP_IGNORE']),
    skipProject: yn(process.env['TS_NODE_SKIP_PROJECT']),
    ignoreDiagnostics: split(process.env['TS_NODE_IGNORE_DIAGNOSTICS']),
    typeCheck: yn(process.env['TS_NODE_TYPE_CHECK']),
    transpileOnly: yn(process.env['TS_NODE_TRANSPILE_ONLY'])
};
/**
 * Default TypeScript compiler options required by `ts-node`.
 */
const DEFAULT_COMPILER_OPTIONS = {
    sourceMap: true,
    inlineSourceMap: false,
    inlineSources: true,
    declaration: false,
    noEmit: false,
    outDir: '$$ts-node$$'
};
/**
 * Split a string array of values.
 */
function split(value) {
    return typeof value === 'string' ? value.split(/ *, */g) : undefined;
}
exports.split = split;
/**
 * Parse a string as JSON.
 */
function parse(value) {
    return typeof value === 'string' ? JSON.parse(value) : undefined;
}
exports.parse = parse;
/**
 * Replace backslashes with forward slashes.
 */
function normalizeSlashes(value) {
    return value.replace(/\\/g, '/');
}
exports.normalizeSlashes = normalizeSlashes;
/**
 * TypeScript diagnostics error.
 */
class TSError extends make_error_1.BaseError {
    constructor(diagnosticText, diagnosticCodes) {
        super(`⨯ Unable to compile TypeScript:\n${diagnosticText}`);
        this.diagnosticText = diagnosticText;
        this.diagnosticCodes = diagnosticCodes;
        this.name = 'TSError';
    }
    /**
     * @internal
     */
    [exports.INSPECT_CUSTOM]() {
        return this.diagnosticText;
    }
}
exports.TSError = TSError;
/**
 * Return a default temp directory based on home directory of user.
 */
function getTmpDir() {
    const hash = crypto.createHash('sha256').update(os_1.homedir(), 'utf8').digest('hex');
    return path_1.join(os_1.tmpdir(), `ts-node-${hash}`);
}
/**
 * Register TypeScript compiler.
 */
function register(opts = {}) {
    const options = Object.assign({}, exports.DEFAULTS, opts);
    const cacheDirectory = options.cacheDirectory || getTmpDir();
    const originalJsHandler = require.extensions['.js'];
    const ignoreDiagnostics = arrify(options.ignoreDiagnostics).concat([
        6059,
        18002,
        18003 // "No inputs were found in config file."
    ]).map(Number);
    const memoryCache = {
        contents: Object.create(null),
        versions: Object.create(null),
        outputs: Object.create(null)
    };
    const ignore = options.skipIgnore ? [] : arrify(options.ignore || '/node_modules/').map(str => new RegExp(str));
    // Install source map support and read from memory cache.
    sourceMapSupport.install({
        environment: 'node',
        retrieveFile(path) {
            return memoryCache.outputs[path];
        }
    });
    // Require the TypeScript compiler and configuration.
    const cwd = process.cwd();
    const { compilerOptions, project, skipProject } = options;
    const compiler = options.compiler || 'typescript';
    const typeCheck = options.typeCheck === true || options.transpileOnly !== true;
    const ts = require(compiler);
    const transformers = options.transformers || undefined;
    const readFile = options.readFile || ts.sys.readFile;
    const fileExists = options.fileExists || ts.sys.fileExists;
    const config = readConfig(cwd, ts, fileExists, readFile, compilerOptions, project, skipProject);
    const configDiagnosticList = filterDiagnostics(config.errors, ignoreDiagnostics);
    const extensions = ['.ts', '.tsx'];
    const fileNames = options.files ? config.fileNames : [];
    const cachedir = path_1.join(path_1.resolve(cwd, cacheDirectory), getCompilerDigest({
        version: ts.version,
        options: config.options,
        fileNames,
        typeCheck,
        ignoreDiagnostics,
        compiler
    }));
    const diagnosticHost = {
        getNewLine: () => os_1.EOL,
        getCurrentDirectory: () => cwd,
        getCanonicalFileName: (path) => path
    };
    const formatDiagnostics = options.pretty
        ? ts.formatDiagnosticsWithColorAndContext
        : ts.formatDiagnostics;
    function createTSError(diagnostics) {
        const diagnosticText = formatDiagnostics(diagnostics, diagnosticHost);
        const diagnosticCodes = diagnostics.map(x => x.code);
        return new TSError(diagnosticText, diagnosticCodes);
    }
    // Render the configuration errors and exit the script.
    if (configDiagnosticList.length)
        throw createTSError(configDiagnosticList);
    // Enable `allowJs` when flag is set.
    if (config.options.allowJs) {
        extensions.push('.js');
        extensions.push('.jsx');
    }
    // Initialize files from TypeScript into project.
    for (const path of fileNames)
        memoryCache.versions[path] = 1;
    /**
     * Get the extension for a transpiled file.
     */
    const getExtension = config.options.jsx === ts.JsxEmit.Preserve ?
        ((path) => /\.[tj]sx$/.test(path) ? '.jsx' : '.js') :
        ((_) => '.js');
    /**
     * Create the basic required function using transpile mode.
     */
    let getOutput = function (code, fileName, lineOffset = 0) {
        const result = ts.transpileModule(code, {
            fileName,
            transformers,
            compilerOptions: config.options,
            reportDiagnostics: true
        });
        const diagnosticList = result.diagnostics ?
            filterDiagnostics(result.diagnostics, ignoreDiagnostics) :
            [];
        if (diagnosticList.length)
            throw createTSError(diagnosticList);
        return [result.outputText, result.sourceMapText];
    };
    let getTypeInfo = function (_code, _fileName, _position) {
        throw new TypeError(`Type information is unavailable without "--type-check"`);
    };
    // Use full language services when the fast option is disabled.
    if (typeCheck) {
        // Set the file contents into cache.
        const updateMemoryCache = function (code, fileName) {
            if (memoryCache.contents[fileName] !== code) {
                memoryCache.contents[fileName] = code;
                memoryCache.versions[fileName] = (memoryCache.versions[fileName] || 0) + 1;
            }
        };
        // Create the compiler host for type checking.
        const serviceHost = {
            getScriptFileNames: () => Object.keys(memoryCache.versions),
            getScriptVersion: (fileName) => {
                const version = memoryCache.versions[fileName];
                // We need to return `undefined` and not a string here because TypeScript will use
                // `getScriptVersion` and compare against their own version - which can be `undefined`.
                // If we don't return `undefined` it results in `undefined === "undefined"` and run
                // `createProgram` again (which is very slow). Using a `string` assertion here to avoid
                // TypeScript errors from the function signature (expects `(x: string) => string`).
                return version === undefined ? undefined : String(version);
            },
            getScriptSnapshot(fileName) {
                // Read contents into TypeScript memory cache.
                if (!Object.prototype.hasOwnProperty.call(memoryCache.contents, fileName)) {
                    memoryCache.contents[fileName] = readFile(fileName);
                }
                const contents = memoryCache.contents[fileName];
                if (contents === undefined)
                    return;
                return ts.ScriptSnapshot.fromString(contents);
            },
            fileExists: debugFn('fileExists', fileExists),
            readFile: debugFn('readFile', readFile),
            readDirectory: debugFn('readDirectory', ts.sys.readDirectory),
            getDirectories: debugFn('getDirectories', ts.sys.getDirectories),
            directoryExists: debugFn('directoryExists', ts.sys.directoryExists),
            getNewLine: () => os_1.EOL,
            getCurrentDirectory: () => cwd,
            getCompilationSettings: () => config.options,
            getDefaultLibFileName: () => ts.getDefaultLibFilePath(config.options),
            getCustomTransformers: () => transformers
        };
        const service = ts.createLanguageService(serviceHost);
        getOutput = function (code, fileName, lineOffset = 0) {
            // Must set memory cache before attempting to read file.
            updateMemoryCache(code, fileName);
            const output = service.getEmitOutput(fileName);
            // Get the relevant diagnostics - this is 3x faster than `getPreEmitDiagnostics`.
            const diagnostics = service.getCompilerOptionsDiagnostics()
                .concat(service.getSyntacticDiagnostics(fileName))
                .concat(service.getSemanticDiagnostics(fileName));
            const diagnosticList = filterDiagnostics(diagnostics, ignoreDiagnostics);
            if (diagnosticList.length)
                throw createTSError(diagnosticList);
            if (output.emitSkipped) {
                throw new TypeError(`${path_1.relative(cwd, fileName)}: Emit skipped`);
            }
            // Throw an error when requiring `.d.ts` files.
            if (output.outputFiles.length === 0) {
                return ['', ''];
            }
            return [output.outputFiles[1].text, output.outputFiles[0].text];
        };
        getTypeInfo = function (code, fileName, position) {
            updateMemoryCache(code, fileName);
            const info = service.getQuickInfoAtPosition(fileName, position);
            const name = ts.displayPartsToString(info ? info.displayParts : []);
            const comment = ts.displayPartsToString(info ? info.documentation : []);
            return { name, comment };
        };
    }
    const compile = readThrough(cachedir, options.cache === true, memoryCache, getOutput, getExtension);
    const register = { cwd, compile, getTypeInfo, extensions, cachedir, ts };
    // Register the extensions.
    extensions.forEach(extension => {
        registerExtension(extension, ignore, register, originalJsHandler);
    });
    return register;
}
exports.register = register;
/**
 * Check if the filename should be ignored.
 */
function shouldIgnore(filename, ignore) {
    const relname = normalizeSlashes(filename);
    return ignore.some(x => x.test(relname));
}
/**
 * Register the extension for node.
 */
function registerExtension(ext, ignore, register, originalHandler) {
    const old = require.extensions[ext] || originalHandler;
    require.extensions[ext] = function (m, filename) {
        if (shouldIgnore(filename, ignore)) {
            return old(m, filename);
        }
        const _compile = m._compile;
        m._compile = function (code, fileName) {
            debug('module._compile', fileName);
            return _compile.call(this, register.compile(code, fileName), fileName);
        };
        return old(m, filename);
    };
}
/**
 * Do post-processing on config options to support `ts-node`.
 */
function fixConfig(ts, config) {
    // Delete options that *should not* be passed through.
    delete config.options.out;
    delete config.options.outFile;
    delete config.options.declarationDir;
    delete config.options.declarationMap;
    delete config.options.emitDeclarationOnly;
    // Target ES5 output by default (instead of ES3).
    if (config.options.target === undefined) {
        config.options.target = ts.ScriptTarget.ES5;
    }
    // Target CommonJS modules by default (instead of magically switching to ES6 when the target is ES6).
    if (config.options.module === undefined) {
        config.options.module = ts.ModuleKind.CommonJS;
    }
    return config;
}
/**
 * Load TypeScript configuration.
 */
function readConfig(cwd, ts, fileExists, readFile, compilerOptions, project, noProject) {
    let config = { compilerOptions: {} };
    let basePath = normalizeSlashes(cwd);
    let configFileName = undefined;
    // Read project configuration when available.
    if (!noProject) {
        configFileName = project
            ? normalizeSlashes(path_1.resolve(cwd, project))
            : ts.findConfigFile(normalizeSlashes(cwd), fileExists);
        if (configFileName) {
            const result = ts.readConfigFile(configFileName, readFile);
            // Return diagnostics.
            if (result.error) {
                return { errors: [result.error], fileNames: [], options: {} };
            }
            config = result.config;
            basePath = normalizeSlashes(path_1.dirname(configFileName));
        }
    }
    // Override default configuration options `ts-node` requires.
    config.compilerOptions = Object.assign({}, config.compilerOptions, compilerOptions, DEFAULT_COMPILER_OPTIONS);
    return fixConfig(ts, ts.parseJsonConfigFileContent(config, ts.sys, basePath, undefined, configFileName));
}
/**
 * Wrap the function with caching.
 */
function readThrough(cachedir, shouldCache, memoryCache, compile, getExtension) {
    if (shouldCache === false) {
        return function (code, fileName, lineOffset) {
            debug('readThrough', fileName);
            const [value, sourceMap] = compile(code, fileName, lineOffset);
            const output = updateOutput(value, fileName, sourceMap, getExtension);
            memoryCache.outputs[fileName] = output;
            return output;
        };
    }
    // Make sure the cache directory exists before continuing.
    mkdirp.sync(cachedir);
    return function (code, fileName, lineOffset) {
        debug('readThrough', fileName);
        const cachePath = path_1.join(cachedir, getCacheName(code, fileName));
        const extension = getExtension(fileName);
        const outputPath = `${cachePath}${extension}`;
        try {
            const output = fs_1.readFileSync(outputPath, 'utf8');
            if (isValidCacheContent(output)) {
                memoryCache.outputs[fileName] = output;
                return output;
            }
        }
        catch (err) { /* Ignore. */ }
        const [value, sourceMap] = compile(code, fileName, lineOffset);
        const output = updateOutput(value, fileName, sourceMap, getExtension);
        memoryCache.outputs[fileName] = output;
        fs_1.writeFileSync(outputPath, output);
        return output;
    };
}
/**
 * Update the output remapping the source map.
 */
function updateOutput(outputText, fileName, sourceMap, getExtension) {
    const base64Map = bufferFrom(updateSourceMap(sourceMap, fileName), 'utf8').toString('base64');
    const sourceMapContent = `data:application/json;charset=utf-8;base64,${base64Map}`;
    const sourceMapLength = `${path_1.basename(fileName)}.map`.length + (getExtension(fileName).length - path_1.extname(fileName).length);
    return outputText.slice(0, -sourceMapLength) + sourceMapContent;
}
/**
 * Update the source map contents for improved output.
 */
function updateSourceMap(sourceMapText, fileName) {
    const sourceMap = JSON.parse(sourceMapText);
    sourceMap.file = fileName;
    sourceMap.sources = [fileName];
    delete sourceMap.sourceRoot;
    return JSON.stringify(sourceMap);
}
/**
 * Get the file name for the cache entry.
 */
function getCacheName(sourceCode, fileName) {
    return crypto.createHash('sha256')
        .update(path_1.extname(fileName), 'utf8')
        .update('\x00', 'utf8')
        .update(sourceCode, 'utf8')
        .digest('hex');
}
/**
 * Ensure the given cached content is valid by sniffing for a base64 encoded '}'
 * at the end of the content, which should exist if there is a valid sourceMap present.
 */
function isValidCacheContent(contents) {
    return /(?:9|0=|Q==)$/.test(contents.slice(-3));
}
/**
 * Create a hash of the current configuration.
 */
function getCompilerDigest(obj) {
    return crypto.createHash('sha256').update(JSON.stringify(obj), 'utf8').digest('hex');
}
/**
 * Filter diagnostics.
 */
function filterDiagnostics(diagnostics, ignore) {
    return diagnostics.filter(x => ignore.indexOf(x.code) === -1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNub2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvdHNub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTBFO0FBQzFFLDJCQUFnRDtBQUNoRCwyQkFBeUM7QUFDekMsdURBQXVEO0FBQ3ZELGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMseUJBQXlCO0FBQ3pCLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMsMkNBQXNDO0FBQ3RDLDZCQUE0QjtBQUc1Qjs7R0FFRztBQUNVLFFBQUEsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQTtBQUU5RDs7R0FFRztBQUNILE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ2pELE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUE7QUFDbEYsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFDM0IsQ0FBUSxHQUFXLEVBQUUsRUFBaUIsRUFBRSxFQUFFO1FBQ3hDLE9BQU8sQ0FBQyxDQUFJLEVBQUUsRUFBRTtZQUNkLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDYixPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLENBQUMsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsQ0FBUSxDQUFTLEVBQUUsRUFBaUIsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFBO0FBd0I3Qzs7R0FFRztBQUNVLFFBQUEsT0FBTyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtBQXlDekQ7O0dBRUc7QUFDVSxRQUFBLFFBQVEsR0FBWTtJQUMvQixL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