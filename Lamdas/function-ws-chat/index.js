const AWS = require('aws-sdk');
const DDB = new AWS.DynamoDB.DocumentClient();
const SNS = new AWS.SNS();
const S3 = new AWS.S3();
const ddb = new AWS.DynamoDB.DocumentClient();

require("./patch.js");

exports.handler = async(event) => {
  let Today = new Date();
  Today.setHours(Today.getHours() - 6);
  const apiGW = new AWS.ApiGatewayManagementApi({ apiVersion: '2018-11-29', endpoint: event.requestContext.domainName + '/' + event.requestContext.stage });
  console.log("EVENTO:", JSON.stringify(event, null, 2));
  try {
    const connectionId = event.requestContext.connectionId;
    let messageWS = JSON.parse(event.body).message;
    console.log("MESSAGE:", JSON.stringify(messageWS, null, 2));
    if (messageWS.hasOwnProperty('userAction') && messageWS.userAction == "messenger") {
      await SNS.publish({
        TopicArn: "arn:aws:sns:us-east-1:354947958136:delegate-lambda-function",
        MessageAttributes: {
          "userAction": {
            "DataType": "String",
            "StringValue": "Pages Access "
          }
        },
        Message: JSON.stringify(messageWS)
      }).promise();

    }
    else if (messageWS.hasOwnProperty('userAction') && messageWS.userAction == "valdiarTOken") {
      await SNS.publish({
        TopicArn: "arn:aws:sns:us-east-1:354947958136:delegate-lambda-function",
        MessageAttributes: {
          "userAction": {
            "DataType": "String",
            "StringValue": "Enviado para validar Token"
          }
        },
        Message: JSON.stringify(messageWS)
      }).promise();

      await apiGW.postToConnection({ ConnectionId: connectionId, Data: JSON.stringify({ data: "Access Token verificado" }) }).promise();
    }
    else if (messageWS.hasOwnProperty('userAction') && messageWS.userAction == "PAT") {

      console.log(messageWS);
      await ddb.put({
        TableName: 'tbl-storage',
        Item: {
          objectId: messageWS.data.idPage,
          tipoObjeto: 1214,
          fecha: `${Today.toISOString().substring(0,10)}`,
          nombreWeb: messageWS.data.nombreWeb,
          accesToken: messageWS.data.access_token
        },
      }).promise();
    }



  }
  catch (lambdaError) {
    console.error("Error en la ejecución del lambda:", lambdaError);
  }
  return { statusCode: 200 };
};