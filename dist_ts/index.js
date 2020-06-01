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
if (process.env.CLI_CALL_TSRUN) {
    // contents of argv array
    // process.argv[0] -> node Executable
    // process.argv[1] -> tsrun executable
    const pathToTsFile = process.argv[2];
    const pathToLoad = path.join(process.cwd(), pathToTsFile);
    Promise.resolve().then(() => __importStar(require(pathToLoad)));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNkI7QUFDN0IsZ0RBQWtDO0FBR2xDLE1BQU0sb0JBQW9CLEdBQXlCO0lBQ2pELGVBQWUsRUFBRTtRQUNmLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNmLE1BQU0sRUFBTyxRQUFRO1FBQ3JCLHNCQUFzQixFQUFFLElBQUk7UUFDNUIsZUFBZSxFQUFFLElBQUk7S0FDSDtJQUNwQixVQUFVLEVBQUUsSUFBSTtDQUNqQixDQUFDO0FBRUYsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNsQyxNQUFNLHVCQUF1QixHQUFHLG9CQUFvQixDQUFDLGVBQWtDLENBQUM7SUFDeEYsb0JBQW9CLENBQUMsZUFBZSxtQ0FDL0IsdUJBQXVCLEtBQzFCLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQ2hDLE1BQU0sRUFBTyxRQUFRLENBQUMsc0RBQXNEO09BQzdFLENBQUM7Q0FDSDtBQUVELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7SUFDdEMsZ0NBQWdDO0NBQ2pDO0FBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRXRDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7SUFDOUIseUJBQXlCO0lBQ3pCLHFDQUFxQztJQUNyQyxzQ0FBc0M7SUFDdEMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMxRCxrREFBTyxVQUFVLElBQUU7Q0FDcEIifQ==