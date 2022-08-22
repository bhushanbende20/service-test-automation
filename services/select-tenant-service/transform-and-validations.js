const { expect, assert } = require("chai");
const addContext = require("mochawesome/addcontext");
var expectedResponse = require("./response.json");
const moment = require("moment");


module.exports.ResponseValidation = async function (object, actualresponse, request, testData) {

    console.log("Response Validation Starts For Select Tenant");

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
       addContext(object, 'Status Code Matches')
    }; 
    return true

}
