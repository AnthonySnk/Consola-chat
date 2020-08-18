const AWS = require("aws-sdk");
const DDB = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require("uuidv4");

exports.handler = async (event) => {
  console.info("EVENT:", JSON.stringify(event, null, 2));
  let fecha = new Date();
  fecha.setHours(fecha.getHours() - 6);

  try {
    await DDB.put({
      TableName: "tbl-user",
      Item: {
        idUser: event.hasOwnProperty("userName") ? event.userName: uuidv4(),
        telefono: event.request.userAttributes.phone_number,
        correo: event.request.userAttributes.email,
        fechaRegistro: fecha.toISOString()
      }
    }).promise();

  } 
  catch (errorPut) {
    console.error("Error al ejecutar el PUT para los datos del usuario.", JSON.stringify(errorPut, null, 2))
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
};
