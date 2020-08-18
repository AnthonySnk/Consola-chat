const AWS = require('aws-sdk');
require("./patch.js");
const sns = new AWS.SNS();
const ddb = new AWS.DynamoDB.DocumentClient();
const APIGW = new AWS.ApiGatewayManagementApi({ apiVersion: '2018-11-29', endpoint: "0cvzgb8kn9.execute-api.us-east-1.amazonaws.com/beta" });

exports.handler = async(event) => {
    try {


        console.log("EVENTO:", JSON.stringify(event, null, 2));
        //definimos todas las variables del proceso incicial
        let chatId, msgattr, payload, body, msgId, Today, nameCustomer, tipo;
        chatId = `${event.message.chat.id}`;
        nameCustomer = `${event.message.chat.first_name} ${event.message.chat.last_name}`;
        
        msgId = event.message.message_id;
        payload = event.message.text;
        Today = new Date();
        Today.setHours(Today.getHours() - 6);
        if (event.message.hasOwnProperty('entities')) {
            for (let iterator of event.message.entities) {
                tipo = iterator.hasOwnProperty('type') ? iterator.type : '-';
            }
        }
        else {
            tipo = '-';
        }

        msgattr = {
            chatId: { DataType: "Number", StringValue: chatId },
            payload: { DataType: "String", StringValue: payload },
            source: { DataType: "String", StringValue: "TELEGRAM" },
            tipo: { DataType: "String", StringValue: tipo },
            sender:{DataType:"String",StringValue:nameCustomer}
        };
        console.log(JSON.stringify(msgattr, null, 2));
        let jsonDataTG = {};
        jsonDataTG.chatId = chatId;
        jsonDataTG.payload= payload;
        jsonDataTG.msgId=msgId;
        jsonDataTG.sender=nameCustomer;
        jsonDataTG.horaMsg = Today.toISOString().substring(11, 16);
        jsonDataTG.fecha = Today.toISOString().substring(0, 10);



        //crearemos un query al tipoObjeto 2100 para poder ver las conexion que estan abiertas
        let getDara = await getData();
        console.log(JSON.stringify(getDara.data[0], null, 2))
        if (getDara.hasOwnProperty('data')) {

            for (let iterator of getDara.data) {

                // let status = false;
                // try {
                // console.log(iterator.objectId);
                //     let connAgentStatus = await APIGW.getConnection({ ConnectionId: iterator.objectId }).promise();
                //     status = true;
                //     console.log(connAgentStatus);
                // }
                // catch (errorSendMessage) {
                //     console.error("No se encontró al agente conectado:", JSON.stringify(errorSendMessage, null, 2));
                // }

                // if (status) {
                    await APIGW.postToConnection({ ConnectionId: iterator.objectId, Data: JSON.stringify(jsonDataTG) }).promise();
                // }
                // else { //Si no, notificamos y enviamos a otro agente
                //     jsonDataTG.estadoSoli = "Nueva";
                 
                // }
            }
              await invocaiones(chatId, msgId, tipo, payload, Today,nameCustomer)

        }
    }
    catch (e) { console.log(e); }


  

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

async function getData() {

    let flag = false;
    let data = {},
        datos = [];
    var params = {
        TableName: 'tbl-storage',
        IndexName: 'tipoObjeto-fecha-index',
        KeyConditionExpression: 'tipoObjeto = :tipoObj',
        ExpressionAttributeValues: { ':tipoObj': 2100 }
    };
    try {
        while (flag == false) {
            data = await ddb.query(params).promise();
            console.log('DATA:\n' + JSON.stringify(data, null, 2));
            if (data.hasOwnProperty('Items') && data.Count != 0) {
                for (let reg of data.Items) {
                    datos.push(reg);
                }
                if (data.hasOwnProperty('LastEvaluatedKey') && typeof data.LastEvaluatedKey != "undefined" && data.Count != 0) {
                    console.log("Scanning for more...");
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                }
                else flag = true;
            }
            else flag = true;
        }
    }
    catch (e) { console.error('Error JSON [getConexions]: ' + JSON.stringify(e, null, 2)); }
    return { 'data': datos, 'status': flag };
}


async function invocaiones(userId, messageId, tipo, payload, Today,nameCustomer) {

    let ddbCheck = await ddb.get({
        TableName: "tbl-storage",
        Key: {
            tipoObjeto: 1,
            objectId: `${userId}` /*Para que detecte que es una sola variable*/
        }
    }).promise();
    //---------------------------
    //-------HAREMOS PUT A CONVERSACION --------//
    if (!ddbCheck.hasOwnProperty('Item')) {
        console.log("El usuario es nuevo asique procederemos hacer el put");
        await ddb.put({
            TableName: 'tbl-storage',
            Item: {
                objectId: userId,
                avatar: "https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
                "contenido": payload,
                "conversacion": `${userId}-telegram`,
                "divider": false,
                "fecha": `${Today.toISOString()}`,
                "origen": "Telegram",
                "sender": nameCustomer,
                "senderId":"new",
                "smsNew":1,
                "tipo": tipo,
                "tipoObjeto": 1
            },
            ConditionExpression: 'attribute_not_exists(objectId)'
        }).promise();

        //-------------------------------//
        //-----HAREMOS EL PUT HISTORIAL CHAT--//
        await ddb.put({
            TableName: 'tbl-storage',
            Item: {
                "contenidoConversacion": [
                    [{
                        "idMensaje": messageId,
                        "Mensaje": payload,
                        "sender": userId,
                        "senderId": "1"
                    }]
                ],
                "fecha": `${Today.toISOString()}`,
                "objectId": `${userId}-telegram`,
                "origen": "Messenger",
                "tipoObjeto": 1213
            },
            ConditionExpression: 'attribute_not_exists(objectId)'
        }).promise();
    }
    else {
        console.log("El usuario contiene registro asique procederemos a obtener el historial");

        let ddbCheck = await ddb.get({
            TableName: "tbl-storage",
            Key: {
                tipoObjeto: 1213,
                objectId: `${userId}-telegram`
            }
        }).promise();
        console.log(JSON.stringify(ddbCheck.Item, null, 2));
        if (ddbCheck.hasOwnProperty('Item')) {
            let contenidoConver = [];

            //------------VAMOS A RECORRER CONTENIDOCONVERSACION -------------//
            console.log("Vamos a recorrer contenidoConversacion");
            for (let iterator of ddbCheck.Item.contenidoConversacion[0]) {
                // for (let iterator2 of iterator) {
                //  
                // }
                contenidoConver.push(iterator);
                console.log(iterator)
            }

            let nuevoSMS = {
                "idMensaje": messageId,
                "Mensaje": payload,
                "sender": userId,
                "senderId": "1"
            }
            contenidoConver.push(nuevoSMS);
            //--------------HAREMOS EL PUT CON NUEVOS MENSAJES---------------//
            await ddb.put({
                TableName: 'tbl-storage',
                Item: {
                    "contenidoConversacion": [
                        contenidoConver
                    ],
                    "fecha": `${Today.toISOString()}`,
                    "objectId": `${userId}-telegram`,
                    "origen": "Telegram",
                    "tipoObjeto": 1213
                }
            }).promise();
        }
        else {
            console.log("Por una extraña razón no tiene hisotiral chat pero si conversaion: " + userId);
        }
    }
}
