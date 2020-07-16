const WS = new WebSocket('wss://js46i4hpoa.execute-api.us-east-1.amazonaws.com/beta');
var timeStamp;
var timeLogged;
//Evento onopen la conexión con el WS
WS.onopen = function () {
  console.log("Comunicación abierta con el servidor WS.");
  if (localStorage.getItem("sesion") == null)
    WS.send(JSON.stringify({ "action": "chat", "message": { "userAction": "login" } }));
  else {
    let sessionData = JSON.parse(localStorage.getItem("sesion"));
    WS.send(JSON.stringify({ "action": "chat", "message": { "userAction": "logged", "data": { "chatId": sessionData.chatIdAgente, "nombreAgente": sessionData.nombre } } }));
  }
};