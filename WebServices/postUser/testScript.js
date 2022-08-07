const EventEmitter = require("events");
const fs = require("fs");
const expect = require("chai").expect;
const config = require("../../config/config.json");
const postUser = require("./testScript.js");
const hitwebservices = require("../../API_Framework/hitWebAPI");
var testDatafile = require("./testcase.json");
var testData = testDatafile.testData;
const MyEmitter = new EventEmitter();
const addContext = require('mochawesome/addContext');
const { getMaxListeners } = require("process");
const { createUserResponseValidation } = require("./validation");
requestData = require("./createUser.json")
var header = {}
var validation = require("./validation.js");




describe('Post Trial Testing', () => {

    console.log("POST Trail Testing ******************************************************");

    MyEmitter.on("testData", (testData) => {
        if (testData.suit.includes(global.executionGroup) && !testData.suit.includes("disabled")) {
            it(String(testData.id), async function () {
                console.log(testData.testName);
                await postUser.getToken(this, testData);
            });
        }

    });


    for (var eachTestData in testData) {
        if (null != eachTestData) {

            MyEmitter.emit("testData", testData[eachTestData]);


        }
    }

    module.exports.getToken = async function (object, testData) {
        object._runnable.title = testData.testName;  
        var URL = config.url + "/public/v2/users";

        addContext(object,'URL : '+URL);

        requestData.email = Math.random() + "@postUsermail.com";

        const options = {
            headers: config.header,
            body: JSON.stringify(requestData, "UTF-8")
        };

        console.log(options);
        addContext(object,'Request Data'+JSON.stringify(options, null, 2));
        var response = await hitwebservices.getResponse("POST", URL, options);
        console.log("Response : " + JSON.stringify(response, null, 2));
        addContext(object,'Response'+JSON.stringify(response, null, 2));
        await validation.createUserResponseValidation(response, requestData, testData);
    }


});


