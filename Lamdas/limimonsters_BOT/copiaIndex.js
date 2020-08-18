const AWS = require('aws-sdk');
const request = require('teeny-request').teenyRequest;
const got = require('got');
const sns = new AWS.SNS();
const ddb = new AWS.DynamoDB.DocumentClient();
require("./patch.js");



const PAGE_ACCESS_TOKEN = "";

exports.handler = async(event) => {
  console.log(JSON.stringify(event, null, 2));
  //definimos todas las variables del proceso incicial
  let userId, msgattr, payload, body, msg, Today, mensajeEnvio;
  
  
  //----------- ESTE CODIGO ES PARA VERIFICACION DEL TOKEN--------///
  if(event.hasOwnProperty("Records")){
    let AAT  = "2669124103364389|ITgmB7aQot3yXldEKVbOUcZ_A4w"
    for(let iterator of event.Records){
      if(iterator.hasOwnProperty("Sns")  &&  iterator.Sns.MessageAttributes.userAction.Value == "Enviado para validar Token"){
        let mensajeSNS = JSON.parse(iterator.Sns.Message)
      let _validacionAPP = await ValidarIdentidad(mensajeSNS.data.acces_token,AAT);
      if(_validacionAPP.flag==true){
        console.log("LA  PETICION CORRESPONDE A NUESTRA APP");
      }
      else console.log("LA PETICION NO CORRESPONDE A NUESTRA APP");
      
       
      }
      else if(iterator.hasOwnProperty("Sns")  &&  iterator.Sns.MessageAttributes.userAction.Value ==  "Pages Access Token"){
        let mensajeSNS = JSON.parse(iterator.Sns.Message)
        PAGE_ACCESS_TOKEN  = iterator.Sns.Message.access_token;
      }
    }
    
  }

  //----------- ESTE CODIGO ES PARA VALIDAR LAS SUBCRIPCIONES A LA APP--------///
else if (event.hasOwnProperty("queryStringParameters")) {
    // Procesando el GET request para validar nuestro webhook
    let VERIFY_TOKEN = "EAAl7jeIK3yUBANSn6eSBE7kuWrRB9WE6";
    let response = { statusCode: 403 },
      mode = event.queryStringParameters['hub.mode'],
      token = event.queryStringParameters['hub.verify_token'],
      challenge = event.queryStringParameters['hub.challenge'];
      
      console.log(` ${mode} + ${token}  + ${challenge}`)

      if (mode == 'subscribe' && token === VERIFY_TOKEN) {
        response.body = challenge;
        response.statusCode = 200;
      }

    return response;

  }
  else if(event.hasOwnProperty("body")){
    body = JSON.parse(event.body);
    console.log(`Mensaje recibido por parte de Messenger:\n${JSON.stringify(body, null, 2)}`);
    Today = new Date();
    Today.setHours(Today.getHours() - 6);
    if (body.object === "Consola") console.log("Entramos desde el evento de consola");
    // await verificar();
    if (body.object === 'page') {
      for (let ev of body.entry) {
        try {
          msg = ev.messaging[0];
          userId = ev.messaging[0].hasOwnProperty('sender') ? ev.messaging[0].sender.id : 0;
          if (userId == 0) return { statusCode: 200 };
          // validaremos que tipo de mensaje nos ha enviado el usuario
          let tipo = 'OTHER';
          if ((msg.message && msg.message.hasOwnProperty('quick_reply')) || msg.hasOwnProperty('postback')) tipo = 'CALLBACK';
          else if (msg.message && msg.message.hasOwnProperty('attachments')) {
            if (msg.message && msg.message.attachments[0].type == 'image' && msg.message.attachments[0].payload.hasOwnProperty('sticker_id')) tipo = 'STICKER';
            else if (msg.message && msg.message.attachments[0].type == 'image') tipo = 'IMAGE';
            else if (msg.message && msg.message.attachments[0].type == 'location') tipo = 'GPS';
            else if (msg.message && msg.message.attachments[0].type == 'file') tipo = 'FILE';
          }
          else if (msg.message.hasOwnProperty('text')) tipo = 'TEXT';
          msgattr = {
            chatId: { DataType: "Number", StringValue: userId },
            botId: { DataType: "String", StringValue: ev.id },
            source: { DataType: "String", StringValue: "MESSENGER" },
            tipo: { DataType: "String", StringValue: tipo }
          };
          // establecemos el PAYLOAD
          if (tipo == 'CALLBACK')
            payload = msg.message ? msg.message.quick_reply.payload : msg.postback.payload;
          else if (msg.hasOwnProperty('attachments') && msg.attachments[0].type == 'fallback') payload = msg.attachments[0];
          else if (msg.message && msg.message.hasOwnProperty('attachments')) payload = { fileId: msg.message.attachments[0].payload.url, type: msg.message.attachments[0].type };
          else if (tipo == 'TEXT') payload = msg.message.text;
          else payload = 'NO_TRACING';
          console.log(JSON.stringify(payload, null, 2));
          console.log(JSON.stringify(msgattr, null, 2));

          let messageId;
          if (msg.message.hasOwnProperty('mid')) messageId = msg.message.mid;


          mensajeEnvio = {}
          if (tipo == 'TEXT') mensajeEnvio.text = "Espera un momento mientras un agente tome tu chat";
          else if (payload.hasOwnProperty('fileId') && tipo == 'STICKER') mensajeEnvio.text = "Enviaste un sticker no?";
          


          await invocaiones(userId, messageId, tipo, payload, Today, mensajeEnvio)

        }
        catch (e) {
          console.log(e)
        }
      }
      return { statusCode: 200 };
    }
    else {
      // Return a '404 Not Found' if event is not from a page subscription
      return { statusCode: 404 };
    }
  }




};


async function ValidarIdentidad(response,ATT) {
  let flag =false;
  console.log(response);
  let URL = `https://graph.facebook.com/v7.0/debug_token?input_token=${response}&access_token=${ATT}`
  let request = await got.get(URL);
  console.log("LA RESPUESTA DE LA API ES");
 let data =JSON.parse(request.body);
 console.log(JSON.stringify(data,null,2))
 if (data.data.hasOwnProperty("app_id")&&data.data.app_id=="2669124103364389"){
   flag =true
 }
 return{flag}

};

async function callSendAPI(sender_psid, response) {
  console.log(response);
  let URL = `https://graph.facebook.com/v7.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  };
  console.log("Deberiamos enviar el mensaje");
  let request = await got.post(URL, { json: request_body });

};

async function invocaiones(userId, messageId, tipo, payload, Today, mensajeEnvio) {
  //==============================================/
  //-------- REALIZAREMOS UN GET y PUT ------------//
  //================================================//
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
        avatar: "https://picsum.photos/250/300?image=660",
        "contenido": payload,
        "conversacion": `${userId}-messenger`,
        "divider": false,
        "fecha": `${Today.toISOString()}`,
        "origen": "Messenger",
        "sender": userId,
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
        "objectId": `${userId}-messenger`,
        "origen": "Messenger",
        "tipoObjeto": 1213
      },
      ConditionExpression: 'attribute_not_exists(objectId)'
    }).promise();
    await callSendAPI(userId, mensajeEnvio, messageId);
  }
  else {
    console.log("El usuario contiene registro asique procederemos a obtener el historial");

    let ddbCheck = await ddb.get({
      TableName: "tbl-storage",
      Key: {
        tipoObjeto: 1213,
        objectId: `${userId}-messenger`
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
          "objectId": `${userId}-messenger`,
          "origen": "Messenger",
          "tipoObjeto": 1213
        }
      }).promise();
    }
    else {
      console.log("Por una extraña razón no tiene hisotiral chat pero si conversaion: " + userId);
    }
  }

  //=====================================================================================/
  //-------- REALIZAREMOS UN GET PARA OBTNER EL MENSAJE ENVIADO POR SOPORTE------------//
  //==================================================================================//
  ddbCheck = await ddb.get({
    TableName: "tbl-storage",
    Key: {
      tipoObjeto: 1213,
      objectId: `${userId}-messenger` /*Para que detecte que es una sola variable*/
    }
  }).promise();

  if (!ddbCheck.hasOwnProperty('Item')) {
    for (let iterator of ddbCheck.Item.contenidoConversacion[0]) {
      for (let iterator2 of iterator[0]) {
        if (iterator2.idMensaje == messageId && (iterator2.senderId != "1")) {
          mensajeEnvio = { "text": iterator2.mensaje }
        }

      }

    }
  }
}