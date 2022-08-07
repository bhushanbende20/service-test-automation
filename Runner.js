const Mocha = require("mocha");
const { mochaReporter } = require("./API_Framework/mochaRunner");
const config = require("./config/config.json");
testModules =config.testPathModules;
mochaRunner = require("./API_Framework/mochaRunner.js");


// const mocha = new Mocha({

//     reporter : 'Mochawesome',
    
// })


// array.forEach(testModules => {
//     mocha.addFile("./WebServices/trail/testScript");  
// });

// mocha.run().on('end',function() {    
//     return {"isSuccess":true,"error":null}
//    });

mochaRunner.mochaReporter(testModules);