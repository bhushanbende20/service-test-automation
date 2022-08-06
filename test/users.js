const EventEmitter = require("events");
const fs = require("fs");
const it = require("mocha").it;
const expect = require("chai").expect;
const config = require("../config/config.json");
const user = require("../test/users.js");
const hitwebservices = require("../API_Framework/hitWebAPI");
//const testData = fs.readFileSync("../test/testcase.json",'utf8');
var testDatafile = require("../test/testcase.json");
var testData = testDatafile.testData;
const MyEmitter = new EventEmitter();
const addContext = require('mochawesome/addContext');




describe('Webserives Trial Testing', () => {

    console.log("******************************************************");

    MyEmitter.on("testData", (testData) => {
if(testData.suit.includes("regression") && !testData.suit.includes("disabled")){
        it(String(testData.id), () => {
            console.log(testData);
            user.getToken(testData);
        });
    }

    });


    for (var eachTestData in testData) {
        if (null != eachTestData) {
            
                     MyEmitter.emit("testData", testData[eachTestData]);
            
     
        }
    }


    module.exports.getToken = function (testData) {


        var URL = config.url + "auth";

        const options = {
            method: 'GET'
        }
        var getdata = hitwebservices.getResponse("GET", URL, options);
        console.log(JSON.stringify(getdata, null, 2));
    }

});
