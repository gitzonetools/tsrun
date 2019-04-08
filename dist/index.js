"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const tsNode = require("ts-node");
const defaultTsNodeOptions = {
    compilerOptions: {
        lib: ['es2016', 'es2017'],
        target: 'es2017',
        experimentalDecorators: true
    },
    skipIgnore: true
};
if (process.argv.includes('--web')) {
    const previousCompilerOptions = defaultTsNodeOptions.compilerOptions;
    defaultTsNodeOptions.compilerOptions = Object.assign({}, previousCompilerOptions, { lib: ['es2016', 'es2017', 'dom'], target: 'es2015' // Script Target should be a string -> 2 is for ES2015
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
    Promise.resolve().then(() => require(pathToLoad));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QixrQ0FBa0M7QUFHbEMsTUFBTSxvQkFBb0IsR0FBbUI7SUFDM0MsZUFBZSxFQUFtQjtRQUNoQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQ3pCLE1BQU0sRUFBTyxRQUFRO1FBQ3JCLHNCQUFzQixFQUFFLElBQUk7S0FDN0I7SUFDRCxVQUFVLEVBQUUsSUFBSTtDQUNqQixDQUFDO0FBRUYsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNsQyxNQUFNLHVCQUF1QixHQUFHLG9CQUFvQixDQUFDLGVBQWtDLENBQUM7SUFDeEYsb0JBQW9CLENBQUMsZUFBZSxxQkFDL0IsdUJBQXVCLElBQzFCLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQ2hDLE1BQU0sRUFBTyxRQUFRLENBQUMsc0RBQXNEO09BQzdFLENBQUM7Q0FDSDtBQUVELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7SUFDdEMsZ0NBQWdDO0NBQ2pDO0FBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRXRDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7SUFDOUIseUJBQXlCO0lBQ3pCLHFDQUFxQztJQUNyQyxzQ0FBc0M7SUFDdEMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMxRCxxQ0FBTyxVQUFVLEdBQUU7Q0FDcEIifQ==