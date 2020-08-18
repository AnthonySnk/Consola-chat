const AWS = require('aws-sdk');
const DDB = new AWS.DynamoDB.DocumentClient();
const SNS = new AWS.SNS();
const S3 = new AWS.S3();

require("./patch.js");

exports.handler = async (event) => {
  const apiGW = new AWS.ApiGatewayManagementApi({ apiVersion: '2018-11-29', endpoint: event.requestContext.domainName + '/' + event.requestContext.stage });
  console.log("EVENTO:", JSON.stringify(event, null, 2));
  try {
    const connectionId = event.requestContext.connectionId;
    let messageWS = JSON.parse(event.body).message;
    console.log("MESSAGE:", JSON.stringify(messageWS, null, 2));

    if (messageWS.hasOwnProperty("pruebaSNS")) {
      await SNS.publish({
        TopicArn: "arn:aws:sns:us-east-1:354947958136:delegate-lambda-function",
        MessageAttributes: {
          "userAction": {
            "DataType": "String",
            "StringValue": "Hola Mundo"
          }
        },
        Message: JSON.stringify(messageWS)
      }).promise();

    }
  }
  catch (lambdaError) {
    console.error("Error en la ejecución del lambda:", lambdaError);
  }
  return { statusCode: 200 };
};