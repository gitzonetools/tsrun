"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCli = void 0;
const path = __importStar(require("path"));
const tsNode = __importStar(require("ts-node"));
const defaultTsNodeOptions = {
    compilerOptions: {
        lib: ['es2017'],
        target: 'es2017',
        experimentalDecorators: true,
        esModuleInterop: true
    },
    skipIgnore: true
};
if (process.argv.includes('--web')) {
    const previousCompilerOptions = defaultTsNodeOptions.compilerOptions;
    defaultTsNodeOptions.compilerOptions = Object.assign(Object.assign({}, previousCompilerOptions), { lib: ['es2016', 'es2017', 'dom'], target: 'es2017' // Script Target should be a string -> 2 is for ES2015
     });
}
if (process.argv.includes('--nocache')) {
    // currently caching is not used
}
tsNode.register(defaultTsNodeOptions);
exports.runCli = async () => {
    // contents of argv array
    // process.argv[0] -> node Executable
    // process.argv[1] -> tsrun executable
    const pathToTsFile = process.argv[2];
    const pathToLoad = path.join(process.cwd(), pathToTsFile);
    Promise.resolve().then(() => __importStar(require(pathToLoad)));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTZCO0FBQzdCLGdEQUFrQztBQUdsQyxNQUFNLG9CQUFvQixHQUF5QjtJQUNqRCxlQUFlLEVBQUU7UUFDZixHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDZixNQUFNLEVBQU8sUUFBUTtRQUNyQixzQkFBc0IsRUFBRSxJQUFJO1FBQzVCLGVBQWUsRUFBRSxJQUFJO0tBQ0g7SUFDcEIsVUFBVSxFQUFFLElBQUk7Q0FDakIsQ0FBQztBQUVGLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDbEMsTUFBTSx1QkFBdUIsR0FBRyxvQkFBb0IsQ0FBQyxlQUFrQyxDQUFDO0lBQ3hGLG9CQUFvQixDQUFDLGVBQWUsbUNBQy9CLHVCQUF1QixLQUMxQixHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUNoQyxNQUFNLEVBQU8sUUFBUSxDQUFDLHNEQUFzRDtPQUM3RSxDQUFDO0NBQ0g7QUFFRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO0lBQ3RDLGdDQUFnQztDQUNqQztBQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUV6QixRQUFBLE1BQU0sR0FBRyxLQUFLLElBQUksRUFBRTtJQUMvQix5QkFBeUI7SUFDekIscUNBQXFDO0lBQ3JDLHNDQUFzQztJQUN0QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXJDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzFELGtEQUFPLFVBQVUsSUFBRTtBQUNyQixDQUFDLENBQUEifQ==