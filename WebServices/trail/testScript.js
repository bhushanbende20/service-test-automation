const EventEmitter = require("events");
const fs = require("fs");
//const it = require("mocha").it;
const expect = require("chai").expect;
const config = require("../../config/config.json");
const user = require("./testScript.js");
const hitwebservices = require("../../API_Framework/hitWebAPI");
//const testData = fs.readFileSync("../test/testcase.json",'utf8');
var testDatafile = require("./testcase.json");
var testData = testDatafile.testData;
const MyEmitter = new EventEmitter();
const addContext = require('mochawesome/addContext');





describe('Get Trial Testing', () => {

    console.log("******************************************************");

    MyEmitter.on("testData", (testData) => {
        if (testData.suit.includes("regression") && !testData.suit.includes("disabled")) {
            it(String(testData.id), async () => {
                console.log(testData);
                await user.getToken(this, testData);
            });
        }

    });


    for (var eachTestData in testData) {
        if (null != eachTestData) {

            MyEmitter.emit("testData", testData[eachTestData]);


        }
    }

    module.exports.getToken = async function(object, testData) {
       // object._runnable.title = testData.testName;
        addContext("bhaitoken ka chal raha hai ky dekh to");
    
    
        var URL = config.url + "auth";
    
        const options = {
            method: 'GET'
        };
        var getdata = hitwebservices.getResponse("GET", URL, options);
        console.log(JSON.stringify(getdata, null, 2));
    }


});


