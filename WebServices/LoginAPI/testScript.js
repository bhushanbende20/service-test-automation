const EventEmitter = require("events");
const fs = require("fs");
const expect = require("chai").expect;
const config = require("../../config/config.json");
const loginUser = require("./testScript.js");
const hitwebservices = require("../../API_Framework/hitWebAPI");
var testDatafile = require("./testcase.json");
var testData = testDatafile.testData;
const MyEmitter = new EventEmitter();
const addContext = require('mochawesome/addContext');
const { getMaxListeners } = require("process");
const { createUserResponseValidation } = require("./validation");
var requestData = require("./request.json")
var header = {}
var validation = require("./validation.js");
var utilities = require("../../utilities/utilities.js");




describe('loginUser Testing', () => {

    console.log("loginUser Testing ******************************************************");

    MyEmitter.on("testData", (testData) => {
        if (testData.suit.includes(global.executionGroup) && !testData.suit.includes("disabled")) {
            it(String(testData.id), async function () {
                console.log(testData.testName);
                await loginUser.verifyTest(this, testData);
            });
        }

    });


    for (var eachTestData in testData) {
        if (null != eachTestData) {

            MyEmitter.emit("testData", testData[eachTestData]);


        }
    }

    module.exports.verifyTest = async function (object, testData) {
        object._runnable.title = testData.testName;  
        var URL = config.url_login;

        addContext(object,'Login URL : '+URL);


       requestData = await utilities.updateJson(requestData,testData.test_key,testData.test_value);

        

        const options = {
            headers: config.header,
            body: requestData
        };

        //console.log(options);
        addContext(object,'Request Data'+JSON.stringify(options, null, 2));
        var response = await hitwebservices.getResponse("POST", URL, options,object);
        console.log("Response : " + JSON.stringify(response, null, 2));
        addContext(object,'Response'+JSON.stringify(response, null, 2));
        await validation.createUserResponseValidation(object,response, requestData, testData);
    }


});


