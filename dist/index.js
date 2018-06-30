"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsNode = require("ts-node");
const path = require("path");
tsNode.register({
    compilerOptions: {
        lib: ['es2016', 'es2017']
    },
    ignore: []
});
if (process.env.CLI_CALL_TSRUN) {
    // contents of argv array
    // process.argv[0] -> node Executable
    // process.argv[1] -> tsrun executable
    const pathToTsFile = process.argv[2];
    const pathToLoad = path.join(process.cwd(), pathToTsFile);
    Promise.resolve().then(() => require(pathToLoad));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFrQztBQUNsQyw2QkFBNkI7QUFFN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNkLGVBQWUsRUFBRTtRQUNmLEdBQUcsRUFBRSxDQUFFLFFBQVEsRUFBRSxRQUFRLENBQUU7S0FDNUI7SUFDRCxNQUFNLEVBQUUsRUFBRTtDQUNYLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7SUFDOUIseUJBQXlCO0lBQ3pCLHFDQUFxQztJQUNyQyxzQ0FBc0M7SUFDdEMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVwQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMxRCxxQ0FBTyxVQUFVLEdBQUU7Q0FDcEIifQ==