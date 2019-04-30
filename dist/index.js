"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const tsNode = require("ts-node");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QixrQ0FBa0M7QUFHbEMsTUFBTSxvQkFBb0IsR0FBbUI7SUFDM0MsZUFBZSxFQUFFO1FBQ2YsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2YsTUFBTSxFQUFPLFFBQVE7UUFDckIsc0JBQXNCLEVBQUUsSUFBSTtRQUM1QixlQUFlLEVBQUUsSUFBSTtLQUNIO0lBQ3BCLFVBQVUsRUFBRSxJQUFJO0NBQ2pCLENBQUM7QUFFRixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ2xDLE1BQU0sdUJBQXVCLEdBQUcsb0JBQW9CLENBQUMsZUFBa0MsQ0FBQztJQUN4RixvQkFBb0IsQ0FBQyxlQUFlLHFCQUMvQix1QkFBdUIsSUFDMUIsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFDaEMsTUFBTSxFQUFPLFFBQVEsQ0FBQyxzREFBc0Q7T0FDN0UsQ0FBQztDQUNIO0FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtJQUN0QyxnQ0FBZ0M7Q0FDakM7QUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFdEMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTtJQUM5Qix5QkFBeUI7SUFDekIscUNBQXFDO0lBQ3JDLHNDQUFzQztJQUN0QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXJDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzFELHFDQUFPLFVBQVUsR0FBRTtDQUNwQiJ9