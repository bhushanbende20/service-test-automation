const req1 = require("sync-request");
const axios = require("axios");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const async = require("async");
var body;
module.exports.getResponse = async function (type, URL, options,object) {

    if(options.hasOwnProperty("body")){
        body = options.body;
    }
    
    //console.log(body);
    var response = {};
     
    //var result = await req1(type,URL,options);
    var result = await axios({
        method: type,
        url: URL,
        data: body,
        headers: options.headers,
        timeout : 5000
    }).then(function (response) {
       console.log(response)
        return response;
    });
    


    if (result != null) {
       //s var body = result.data.toString('utf8');
        var body = result.data;
        if (IsJsonString(body)) {
            body = JSON.parse(body)
        }
        response = { "statusCode": result.status, "headers": result.headers, "body": body, "error": null }
    } else {
        response = { "statusCode": null, "headers": null, "body": null, "error": null }
    }

    return response

}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}