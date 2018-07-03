"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const tsNode = require("ts-node");
const defaultTsNodeOptions = {
    compilerOptions: {
        lib: ['es2016', 'es2017'],
        target: 'es2015',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QixrQ0FBa0M7QUFFbEMsTUFBTSxvQkFBb0IsR0FBbUI7SUFDM0MsZUFBZSxFQUFFO1FBQ2YsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQztRQUN4QixNQUFNLEVBQUUsUUFBUTtLQUNqQjtJQUNELFVBQVUsRUFBRSxJQUFJO0lBQ2hCLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7Q0FDbkQsQ0FBQTtBQUVELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7SUFDdEMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztDQUNwQztBQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUV0QyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFO0lBQzlCLHlCQUF5QjtJQUN6QixxQ0FBcUM7SUFDckMsc0NBQXNDO0lBQ3RDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFcEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDMUQscUNBQU8sVUFBVSxHQUFFO0NBQ3BCIn0=