const Mocha = require("mocha");


module.exports.mochaReporter=async function(testModules){  
const mocha = new Mocha({

    reporter : 'Mochawesome',

    reporterOptions:{
        reportFilename : "SERVICE TEST AUTOMATION ",
        timestamp: 'ddmmyyHH:MM'
    }    
})


testModules.forEach(testModules  => {
    mocha.addFile(testModules);  
});

mocha.run().on('end',async function() {    
    return {"isSuccess":true,"error":null}
   });

}