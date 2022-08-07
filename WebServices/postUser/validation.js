const { expect } = require("chai");
var expectedResponse  = require("./response.json");


module.exports.createUserResponseValidation = async function(response,request,testData){

    console.log("Response Validation Starts For CreateUSer");
    
    
    if(expect(response.statusCode).to.equal(testData.status)){
        console.log("Status Code Matches")
    }else{
        console.log("status code fails")
        expect(true).to.be(false);
    };





}