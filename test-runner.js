const Mocha = require("mocha");
const config = require("./config/config.json");
testModules = config.testPathModules;
mochaRunner = require("./mocha-runner.js");
global.executionGroup = config.executionGroup;
global.path = __dirname;

if (undefined != process.argv[2]) { global.executionGroup = process.argv[2] }


mochaRunner.mochaReporter(testModules);
 