const { expect, assert } = require("chai");
const addContext = require("mochawesome/addcontext");
var expectedResponse = require("./response.json");
var utilities =require(global.path+"/util/common-util.js")


module.exports.createUserResponseValidation = async function (object, actualresponse, request, testData) {

    console.log("Response Validation Starts For Login User : ");
    addContext(object, 'Response Validation Starts For Login User : ');

    if (testData.status != actualresponse.statusCode) {
        if (actualresponse.body = testData.error_body) {

        } else {
            console.log("error body not matching");
            addContext(object, 'error body not matching');
            expect(true).to.be.equal(false);
        }
    }


    if (expect(actualresponse.statusCode).to.equal(testData.status)) {
         console.log("Status Code Matches");
        addContext(object, 'Status Code Matches'); 

        //expect(await utilities.isSameJson(object,actualresponse,expected)).to.be.equal(true);
    }

}