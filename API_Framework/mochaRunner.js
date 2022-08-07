const Mocha = require("mocha");


module.exports.mochaReporter=function(testModules){
const mocha = new Mocha({

    reporter : 'Mochawesome',
    
})


testModules.forEach(testModules => {
    mocha.addFile(testModules);  
});

mocha.run().on('end',function() {    
    return {"isSuccess":true,"error":null}
   });

}