"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsNode = require("ts-node");
const path = require("path");
tsNode.register({
    compilerOptions: {
        lib: ['es2016', 'es2017']
    }
});
if (process.env.CLI_CALL) {
    // contents of argv array
    // process.argv[0] -> node Executable
    // process.argv[1] -> tsrun executable
    const pathToTsFile = process.argv[2];
    const pathToLoad = path.join(process.cwd(), pathToTsFile);
    Promise.resolve().then(() => require(pathToLoad));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFrQztBQUNsQyw2QkFBNkI7QUFFN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNkLGVBQWUsRUFBRTtRQUNmLEdBQUcsRUFBRSxDQUFFLFFBQVEsRUFBRSxRQUFRLENBQUU7S0FDNUI7Q0FDRixDQUFDLENBQUM7QUFFSCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0lBQ3hCLHlCQUF5QjtJQUN6QixxQ0FBcUM7SUFDckMsc0NBQXNDO0lBQ3RDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFcEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDMUQscUNBQU8sVUFBVSxHQUFFO0NBQ3BCIn0=