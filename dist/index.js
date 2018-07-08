"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const tsNode = require("ts-node");
const defaultTsNodeOptions = {
    compilerOptions: {
        lib: ['es2016', 'es2017'],
        target: 'es2015',
        experimentalDecorators: true
    },
    skipIgnore: true,
    cacheDirectory: path.join(__dirname, '../tscache')
};
if (process.argv.includes('--nocache')) {
    defaultTsNodeOptions.cache = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QixrQ0FBa0M7QUFHbEMsTUFBTSxvQkFBb0IsR0FBbUI7SUFDM0MsZUFBZSxFQUFtQjtRQUNoQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQ3pCLE1BQU0sRUFBTyxRQUFRO1FBQ3JCLHNCQUFzQixFQUFFLElBQUk7S0FDN0I7SUFDRCxVQUFVLEVBQUUsSUFBSTtJQUNoQixjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO0NBQ25ELENBQUM7QUFFRixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO0lBQ3RDLG9CQUFvQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Q0FDcEM7QUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFdEMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTtJQUM5Qix5QkFBeUI7SUFDekIscUNBQXFDO0lBQ3JDLHNDQUFzQztJQUN0QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXJDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzFELHFDQUFPLFVBQVUsR0FBRTtDQUNwQiJ9