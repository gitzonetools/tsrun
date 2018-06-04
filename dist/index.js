"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsNode = require("ts-node");
const path = require("path");
tsNode.register({
    compilerOptions: {
        lib: ['es2016', 'es2017']
    }
});
const pathToLoad = path.join(process.cwd(), process.argv.pop());
Promise.resolve().then(() => require(pathToLoad));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFrQztBQUNsQyw2QkFBNkI7QUFFN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNkLGVBQWUsRUFBRTtRQUNmLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7S0FDMUI7Q0FDRixDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDaEUscUNBQU8sVUFBVSxHQUFFIn0=