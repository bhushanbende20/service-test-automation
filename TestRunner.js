const Mocha = require("mocha");
const config = require("./config/config.json");
testModules =config.testPathModules;
mochaRunner = require("./API_Framework/mochaRunner.js");
global.executionGroup = config.executionGroup;

mochaRunner.mochaReporter(testModules);