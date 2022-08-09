module.exports.updateJson = async function (payloadData, testDataKey, testDatavalues) {
    
    for (var i = 0; i < testDataKey.length; i++) {
        
        if(testDataKey[i].includes(".")){
            arr = testDataKey[i].split(".")
            var tempData = payloadData
            for(var k=0;k<arr.length-1;k++){
                tempData = tempData[arr[k]]
            }
            tempData[arr[k]] = testDatavalues[i]
        }else{

            var fieldName = testDataKey[i]
            payloadData[fieldName] = testDatavalues[i]; 
        }
    }

    return payloadData;
    
}