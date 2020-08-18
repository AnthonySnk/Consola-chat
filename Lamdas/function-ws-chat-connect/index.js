const AWS = require("aws-sdk");
const Dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log("EVENTO:", JSON.stringify(event, null, 2));
  let connectionId = event.requestContext.connectionId;
  let Today = new Date();
  Today.setHours(Today.getHours() - 6);
  try {
    await Dynamo.put({
      TableName: "tbl-storage",
      Item: { objectId: connectionId, tipoObjeto: 2100, fecha: Today.toISOString() }
    }).promise();
  } catch (errorPut) {
    console.error(`Error al guardar el ConnectionID: ${connectionId} en Dynamo.`, JSON.stringify(errorPut, null, 2));
  }
  return { statusCode: 200 };
};