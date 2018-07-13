"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const tsNode = require("ts-node");
const tsCacheDir = path.join(__dirname, "../tscache");
const defaultTsNodeOptions = {
    compilerOptions: {
        lib: ["es2016", "es2017"],
        target: "es2015"
    },
    skipIgnore: true,
    cacheDirectory: tsCacheDir
};
// check wether a cache is feasible
if (process.argv.includes("--nocache")) {
    defaultTsNodeOptions.cache = false;
}
else {
    var fs = require('fs');
    fs.access(tsCacheDir, fs.constants.W_OK, function (err) {
        if (err) {
            defaultTsNodeOptions.cache = false;
        }
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QixrQ0FBa0M7QUFFbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFdEQsTUFBTSxvQkFBb0IsR0FBbUI7SUFDM0MsZUFBZSxFQUFFO1FBQ2YsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUN6QixNQUFNLEVBQUUsUUFBUTtLQUNqQjtJQUNELFVBQVUsRUFBRSxJQUFJO0lBQ2hCLGNBQWMsRUFBRSxVQUFVO0NBQzNCLENBQUM7QUFFRixtQ0FBbUM7QUFDbkMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtJQUN0QyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0NBQ3BDO0tBQU07SUFDTCxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBUyxHQUFHO1FBQ25ELElBQUksR0FBRyxFQUFFO1lBQ1Asb0JBQW9CLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNwQztJQUNILENBQUMsQ0FBQyxDQUFDO0NBQ0o7QUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFdEMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTtJQUM5Qix5QkFBeUI7SUFDekIscUNBQXFDO0lBQ3JDLHNDQUFzQztJQUN0QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXJDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzFELHFDQUFPLFVBQVUsR0FBRTtDQUNwQiJ9