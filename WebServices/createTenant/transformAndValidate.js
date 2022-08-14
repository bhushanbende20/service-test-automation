const { expect, assert } = require("chai");
const addContext = require("mochawesome/addcontext");
var expectedResponse = require("./response.json");
const moment = require("moment");


module.exports.ResponseValidation = async function (object, actualresponse, request, testData) {

    console.log("Response Validation Starts For CreateUSer");

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


module.exports.buildBody = async function (object, requestData, testData) {

    var requestData = requestData;

    var currentTimestamp = moment().format("YYYY-MM-DD_hh-mm-ss-A");

    var clientName = "Del_API_Tenant_" + currentTimestamp;
    var clientDesc = "Del API Tenant Description_" + currentTimestamp;
    var note = "Tenant note " + currentTimestamp;
    var urlSlugName = "slugname" + currentTimestamp;
    var salesForceAccountID = "999" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);

    requestData.payload.description = "clientDesc" + clientDesc;
    requestData.payload.notes = "clientNote", note;
    requestData.payload.totangoId = null,
    requestData.payload.allowedIPAddresses = null,
    requestData.payload.defaultTimezone = "Africa/Abidjan",
    requestData.payload.defaultCurrencyCodeId = 1,
      requestData.payload.name = clientName,
        requestData.payload.urlSlugName = urlSlugName,
        requestData.payload.domainsToAdd = [],
        requestData.payload.productFeaturesToAdd = [],
        requestData.payload.productsToAdd = [6, 10, 13, 9, 1, 2, 3, 5, 7, 8, 11, 14],
        requestData.payload.partnerEntityId = null,
        requestData.payload.isTwoFactorRequired = false,
        requestData.payload.salesForceAccountID = salesForceAccountID,
        requestData.payload.ssoDefinitions = []

    return requestData
}