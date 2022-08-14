const EventEmitter = require("events");
const fs = require("fs");
const expect = require("chai").expect;
const config = require("../../config/config.json");
const createTenant = require("./test-script.js");
const hitwebservices = require("../../util/api-util");
var testDatafile = require("./test-data.json");
var testData = testDatafile.testData;
const MyEmitter = new EventEmitter();
const addContext = require('mochawesome/addContext');
const { getMaxListeners } = require("process");
const { createUserResponseValidation } = require("./transform-and-validations");
requestData = require("./request.json")
var header = {}
var transformAndValidate = require("./transform-and-validations.js");
const moment = require('moment');
var currentTimestamp = moment().format("YYYY-MM-DD_hh-mm-ss-A");
var pathURL = "legacy-admin/client/create";
var loginAPIreq = require("../login-service/request.json");
const { doesNotMatch } = require("assert");
var pathURLLogin = "legacy-authentication/login";

describe('Create Tenant Testing', () => {

    console.log("Create Tenant Testing ******************************************************");

    MyEmitter.on("testData", (testData) => {
        if (testData.suit.includes(global.executionGroup) && !testData.suit.includes("disabled")) {
            it(String(testData.id), async function () {
                console.log(testData.testName);
                await createTenant.verifyTest(this, testData);
            }).timeout(9000000);
        }

    });


    for (var eachTestData in testData) {
        if (null != eachTestData) {

            MyEmitter.emit("testData", testData[eachTestData]);


        }
    }

    module.exports.verifyTest = async function (object, testData) {
        object._runnable.title = testData.testName;
        var URL = config.url + pathURL;

        addContext(object, 'URL : ' + URL);

        requestData = await transformAndValidate.buildBody(object, requestData, testData)

        config.header.Authorization = "Bearer " + await createTenant.getLatestToken(object);

        const options = {
            headers: config.header,
            body: JSON.stringify(requestData, "UTF-8"),

        };

        console.log(options);
        addContext(object, 'Request Data' + JSON.stringify(options, null, 2));
        var response = await hitwebservices.getResponse("POST", URL, options);
        console.log("Response : " + JSON.stringify(response, null, 2));
        addContext(object, 'Response' + JSON.stringify(response, null, 2));
        await transformAndValidate.ResponseValidation(object, response, requestData, testData);
        return true
    }


});

module.exports.getLatestToken = async function (object) {
    url = config.url + pathURLLogin;

    const options = {
        headers: config.header,
        body: JSON.stringify(loginAPIreq, "UTF-8"),

    };
    var responseLog = await hitwebservices.getResponse("POST", url, options);

    return responseLog.body.token;

};


