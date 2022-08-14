const req1 = require("sync-request");
const axios = require("axios");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const async = require("async");
var body;
module.exports.getResponse = async function (type, URL, options,object) {

    if(options.hasOwnProperty("body")){
        reqbody = options.body;
    }
    
    //console.log(body);
    var response = {};
     
    //var result = await req1(type,URL,options);
    var result = await axios({
        method: type,
        url: URL,
        data: reqbody,
        headers: options.headers,
        timeout : 9000000
    }).then(async function (response) {
       //console.log(response)
        return response;
    });
    


    if (result != null) {
       //s var body = result.data.toString('utf8');
        var body = result.data;
        if (await IsJsonString(body)) {
            body = JSON.parse(body)
        }
        response = { "statusCode": result.status, "headers": result.headers, "body": body, "error": null }
    } else {
        response = { "statusCode": null, "headers": null, "body": null, "error": null }
    }

    return response

}

async function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}