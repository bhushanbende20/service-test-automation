const req1 = require("sync-request");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const async = require("async");
module.exports.getResponse = function(type, URL, options) {

    
    var response = {};
    var result =  req1(type, URL, options);
    if (result != null) {
        var body = result.body.toString('utf8')
        if (IsJsonString(body)) {
            body = JSON.parse(body)
        }
        response = { "statusCode": result.statusCode, "headers": result.headers, "body": body, "error": null }
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