const { expect } = require("chai");
const addContext = require("mochawesome/addcontext");
var expectedResponse  = require("./response.json");


module.exports.createUserResponseValidation = async function(object,response,request,testData){

    console.log("Response Validation Starts For CreateUSer");
    
    if(testData.status!=response.statusCode){
        if(response.body=testData.error_body){

        }else{
            console.log("error body not matching");
            addContext(object,'error body not matching');
            expect(true).to.be.equal(false);
        }
    }
    

    if(expect(response.statusCode).to.equal(testData.status)){console.log("Status Code Matches")}

}