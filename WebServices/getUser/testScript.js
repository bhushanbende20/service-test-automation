const EventEmitter = require("events");
const fs = require("fs");
const expect = require("chai").expect;
const config = require("../../config/config.json");
const user = require("./testScript.js");
const hitwebservices = require("../../API_Framework/hitWebAPI");
var testDatafile = require("./testcase.json");
var testData = testDatafile.testData;
const MyEmitter = new EventEmitter();
const addContext = require('mochawesome/addContext');





describe('Get Trial Testing', () => {

    console.log("Get Trial Testing******************************************************");

    MyEmitter.on("testData", (testData) => {
        if (testData.suit.includes(global.executionGroup) && !testData.suit.includes("disabled")) {
            it(String(testData.id), async () => {
                console.log(testData);
                
                await user.userlist(this, testData);
            });
        }

    });


    for (var eachTestData in testData) {
        if (null != eachTestData) {

            MyEmitter.emit("testData", testData[eachTestData]);


        }
    }

    module.exports.userlist = async function(object, testData) {
       //object._runnable.title = testData.testName;
        addContext(this,"bhaitoken ka chal raha hai ky dekh to");
    
    
        var URL = config.url + "/public/v2/users";
        const options = {
            method: 'GET',
            Authorization : "Bearer " +config.token
        };
        var getdata = await hitwebservices.getResponse("GET", URL, options);
        console.log(JSON.stringify(getdata, null, 2));
    }


});


