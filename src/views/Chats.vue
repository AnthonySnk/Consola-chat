 
<template >
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="5" sm="5" md="3">
        <v-card height="80vh" v-scroll.self="onScroll" class="overflow-y-auto scroll">
          <!-- ====================Conexion Mensajes de texto======================================= -->
          <h4 class="fontdic">Bandeja de entrada</h4>
          <v-divider></v-divider>

          <v-list>
            <v-list-item-group
              v-model="selected"
              mandatory
              active-class="tile_active"
              color="indigo"
            >
              <template v-for="(item,index) in dataDATA">
                <v-list-item class="bandeja tile" v-if="item" :key="item.objectId" ripple>
                  <div v-if="item.origen=='Messenger'||item.origen=='Telegram'& item.senderId==1">
                    <v-badge :color="item.origen == 'Messenger'?'pink':'blue'" content="New">
                      <v-list-item-avatar>
                        <img :src="item.avatar" />
                      </v-list-item-avatar>
                    </v-badge>
                  </div>

                  <div v-else>
                    <v-list-item-avatar>
                      <img :src="item.avatar" />
                    </v-list-item-avatar>
                  </div>

                  <div align="left">
                    <v-list-item-content @click="InvocarChat(index)">
                      <v-list-item-title class="fontdic2" v-html="item.objectId"></v-list-item-title>

                      <v-list-item-subtitle
                        class="fontdic2"
                        v-html="item.contenido.substring(0,25)"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </div>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>

          <!-- =========================================================== -->
        </v-card>
      </v-col>
      <v-col cols="5" sm="5" md="6">
        <v-card height="80vh">
          <v-card
            height="92%"
            outlined
            v-scroll.self="onScroll"
            class="overflow-y-auto scroll containe-general"
          >
            <h4 class="fontdic">Conversación de {{chatActive}}</h4>
            <v-divider></v-divider>
            <!-- =========================================================== -->
            <template v-for="(item) in dataHis">
              <div v-if="item.senderId=='1'" :key="item">
                <div class="text-left" justify="start">
                  <v-spacer></v-spacer>
                  <v-list-item>
                    <v-list-item-avatar>
                      <img src="@/assets/images/person.png" />
                      <!-- <img :src="item.avatar" />   -->
                    </v-list-item-avatar>

                    <div class="chat-container">
                      <v-list-item-content @click="InvocarChat(index)">
                        <v-list-item-title class="fontdic2" v-html="item.sender"></v-list-item-title>
                        <v-list-item-content class="fontdic2" v-html="item.Mensaje"></v-list-item-content>
                      </v-list-item-content>
                    </div>
                  </v-list-item>
                </div>
              </div>
              <div v-else :key="item">
                <div class="text-right dark" justify="end">
                  <v-layout wrap justify-end>
                    <v-flex shrink>
                      <v-list-item>
                        <div class="chat-container2">
                          <v-list-item-content @click="InvocarChat(index)">
                            <v-list-item-title class="fontdic2" v-html="item.sender"></v-list-item-title>
                            <v-list-item-content class="fontdic2" v-html="item.Mensaje"></v-list-item-content>
                          </v-list-item-content>
                        </div>
                        <v-list-item-avatar>
                          <img src="@/assets/images/customer-service.png" />
                          <!-- <img :src="item.avatar" />   -->
                        </v-list-item-avatar>
                      </v-list-item>
                    </v-flex>
                  </v-layout>
                </div>
              </div>
            </template>

            <!-- <template>
              <v-timeline>
                <v-timeline-item v-for="item in dataHis" :key="item" hideDot>
                  <template>
                    <span>{{item.sender}}</span>
                  </template>
                  <div v-if="item.senderId=='1'" :key="item">
                    <v-card class="elevation-2" color="#5bc500">
                      <v-card-text>{{item.Mensaje}}</v-card-text>
                    </v-card>
                  </div>
                  <div v-else :key="item">
                    <v-card class="elevation-2" color="#00a9e0">
                      <v-card-text>{{item.Mensaje}}</v-card-text>
                    </v-card>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </template>-->
            <!-- =========================================================== -->
          </v-card>

          <template>
            <v-card class="chat-form-container envio">
              <form id="chat-form">
                <input
                  v-model="dataHis2"
                  id="msg"
                  type="text"
                  placeholder="Ingrese el mensaje"
                  required
                  autocomplete="off"
                />
                <button class="btn" @click="insertarChat()">
                  <i class="fas fa-paper-plane"></i> Enviar
                </button>
              </form>
            </v-card>
          </template>
        </v-card>
      </v-col>

      <v-col cols="5" sm="5" md="3">
        <v-card height="80vh">
          <v-card
            height="100%"
            outlined
            v-scroll.self="onScroll"
            class="overflow-y-auto scroll containe-general"
          >
            <h4 class="fontdic">Detalles - Chat - {{chatActive}}</h4>
            <v-divider></v-divider>
            <h2 class="fontdic3">Integrantes</h2>
            <v-divider></v-divider>
            <template v-for="(item) in integrantes">
              <v-list-item align="start" v-if="item.senderId=='1'" :key="item">
                <v-list-item-avatar>
                  <img src="@/assets/images/person.png" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="fontdic2">{{item.sender}}</v-list-item-title>
                  <v-list-item-subtitle class="fontdic2">Cliente</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item align="start" v-else :key="item">
                <v-list-item-avatar>
                  <img src="@/assets/images/customer-service.png" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="fontdic2">{{item.sender}}</v-list-item-title>
                  <v-list-item-subtitle class="fontdic2">Soporte</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-divider></v-divider>
            <template>
              <!-- <h2 class="fontdic3">Número del cliente</h2>
              <h3 class="fuenteDeatelle">+50378988800</h3>
              <v-divider></v-divider>-->
              <h2 class="fontdic3">Sección de Soporte</h2>
              <v-divider></v-divider>
              <v-col cols="12" sm="11">
                <v-radio-group v-model="radios" :mandatory="false">
                  <v-radio class="radio" label="Disponible" value="Disponible"></v-radio>
                  <v-radio class="radio" label="Ocupado" value="Ocupado"></v-radio>
                </v-radio-group>
                <h2 class="fontdic3">Nombre:</h2>
                <h3 class="fuenteDeatelle">{{nombreSoporte}}</h3>
                <h2 class="fontdic3">Departamento:</h2>
                <h3 class="fuenteDeatelle">{{departamento}}</h3>
                <h3 class="fontdic3">idUsuario:</h3>
                <h3 class="fuenteDeatelle">{{nombreUser}}</h3>
                <h3 class="fontdic3">Rol:</h3>
                <h3 class="fuenteDeatelle">{{rolAge}}</h3>
                <h3 class="fontdic3">Email:</h3>
                <h3 class="fuenteDeatelle">{{email}}</h3>
              </v-col>
            </template>
            <br />
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
// eslint-disable-next-line no-unused-vars
import { AmplifyEventBus } from "aws-amplify-vue";
import axios from "axios";
// console.log(this.dataDATA);
//-----------------------------//
// conexion del web socket de AWS
//-----------------------------//

const WS = new WebSocket(
  "wss://0cvzgb8kn9.execute-api.us-east-1.amazonaws.com/beta"
);
//Evento onopen la conexión con el WS

export default {
  async created() {
    let varstorage = `CognitoIdentityServiceProvider.61fqrbv8dm6omh5lt79gklk90k.${localStorage.nombreUser}.accessToken`;

    this.$Amplify.API.graphql(
      this.$Amplify.graphqlOperation(`subscription nuevasConversaciones{
        onUpdateTblStorage(tipoObjeto:1){
          __typename
          objectId
          tipoObjeto
           avatar
           contenido
           divider
           sender
           senderId
           paginaOrigen
           conversacion
           origen
        }
      }
      `)
    ).subscribe({
      //Push the new items onto our listItems array for dispay
      next: action => {
        if (
          this.dataDATA[0].objectId !=
          action.value.data.onUpdateTblStorage.objectId
        ) {
          this.dataDATA.unshift(action.value.data.onUpdateTblStorage);
        } else {
          this.dataDATA[0] = action.value.data.onUpdateTblStorage;
          console.log(this.dataDATA);
        }
      }
    });

    let datos = await this.$Amplify.API.graphql(
      this.$Amplify.graphqlOperation(`
    query historialSMS {
        queryTblStoragesByTipoObjetoFechaIndex(
         tipoObjeto:1
        ) {
          items {
          	objectId,
            tipoObjeto,
            sender
            senderId
            origen
            tipo
            contenido
            fecha
            avatar
            divider
            conversacion
            paginaOrigen
          }
        }
      }`)
    );

    for (const iterator of datos.data.queryTblStoragesByTipoObjetoFechaIndex
      .items) {
      this.dataDATA.push(iterator);
    }
    WS.onopen = function() {
      console.log("Comunicación abierta con el servidor WS.");
      WS.send(
        JSON.stringify({
          action: "chat",
          message: { MENSAJE: "MENSAJE DE PRRUEBA" }
        })
      );
    };

    //-----------------------------//
    // conexion del web socket de AWS
    //-----------------------------//
    WS.onmessage = async function(message) {
      console.log("HEMOS RECIBIDO UN NUEVO MENSAJE");
      let datos = JSON.parse(message.data);
      // this.contenido = datos.payload;
      // this.conversacion = `${datos.chatId}-telegram`;
      // this.fecha = datos.fechaMsg;
      // this.objectId = `${datos.chatId}`;
      // this.origen = "Telegram";
      // this.sender = datos.sender;
      // this.tipo = "Texto";

      // let conversacion2 = {
      //   avatar:
      //     "https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
      //   contenido: datos.payload,
      //   conversacion: `${datos.chatId}-telegram`,
      //   divider: true,
      //   fecha: datos.fechaMsg,
      //   objectId: `${datos.chatId}`,
      //   // chatId: datos.chatId,
      //   origen: "Telegram",
      //   sender: datos.sender,
      //   tipo: "Texto",
      //   tipoObjeto: 1
      // };
      // this.conversacion2 = conversacion2;
      // console.log(this.objectId);

      // let conversacionNew = await this.$Amplify.API.graphql(
      //   this.$Amplify.graphqlOperation(`subscription nuevasConversaciones{
      //   onUpdateTblStorage(tipoObjeto:1){
      //     __typename
      //     objectId
      //     tipoObjeto
      //      avatar
      //      contenido
      //      divider
      //      sender
      //      paginaOrigen
      //      conversacion
      //      origen
      //   }
      // }
      // `)
      // );
      // if (
      //   Object.prototype.hasOwnProperty.call(conversacionNew, "paginaOrigen")
      // ) {
      //   console.log(conversacionNew);
      // }

      // await this.$Amplify.API.graphql(
      //   this.$Amplify.graphqlOperation(`mutation AgregarChat {
      //         updateTblStorage(input:{objectId:"${datos.chatId}",tipoObjeto:1,fecha:${datos.fecha}
      //           )}}) {
      //           objectId
      //           tipoObjeto
      //         }
      //       }`)
      // );
      // console.log("No se xk no imprime esto");
      // console.log(conversacionNew);

      var data = JSON.stringify({
        query: `mutation AgregarChat {updateTblStorage(input:{objectId:"${datos.chatId}",tipoObjeto:1,fecha:"${datos.fechaMsg}",avatar:"https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",contenido:"${datos.payload}",conversacion:"${datos.chatId}-telegram",divider:true, origen: "Telegram",sender: "${datos.sender}",senderId:"1"}) {
          objectId
          tipoObjeto
           avatar
           contenido
           divider
           sender
           senderId
           paginaOrigen
           conversacion
           origen
              }
           }`,
        variables: {}
      });

      var config = {
        method: "post",
        url:
          "https://xo6b4pks5ncmrkyyadroyj4r4i.appsync-api.us-east-1.amazonaws.com/graphql",
        headers: {
          Authorization: localStorage.getItem(varstorage)
        },
        data: data
      };

      axios(config)
        .then(function(response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function(error) {
          console.log(error);
        });

      // if (
      //   Object.prototype.hasOwnProperty.call(conversacionNew, "paginaOrigen")
      // ) {
      //   console.log(conversacionNew);
      // }
    };
  },

  data() {
    return {
      veamos: [],
      conversacion2: {},
      avatar:
        "https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
      contenido: "",
      conversacion: "",
      divider: true,
      fecha: "",
      objectId: `undefined`,
      // chatId: datos.chatId,
      sender: "",
      tipo: "",
      tipoObjeto: "",

      //DATOS PARA SOPORTE//
      // mensake: localStorage.mensajenuevo,

      estados: ["Disponible", "Ocupado"],
      nombreSoporte: localStorage.nombre,
      departamento: localStorage.departamento,
      nombreUser: localStorage.nombreUser,
      rolAge: localStorage.rol,
      email: localStorage.email,
      //DATOS DEL CLIENTE
      dataDATA: [],
      dataHis: [],
      dataHis2: "",
      integrantes: [],
      idChatUser: "",
      contador: "",
      origen: "",
      // avatarCliente: "../assets/customer-service.png",
      chatActive: localStorage.chatUSER,
      Drawer: true,
      signedIn: false,
      rol: "Agente",
      tkn: "",
      Integraciones: [
        {
          title: "Integraciones",
          icon: "fas fa-archive",
          link: "/integraciones"
        }
      ],
      Configuracion: [
        { title: "Configuración", icon: "fas fa-cog", link: "/settings" }
      ],
      Dashboard: [
        { title: "Dashboard", icon: "fas fa-tachometer-alt", link: "/" }
      ],

      right: null
    };
  },

  watch: {
    sender: (nuevoValor, valorAnterior) => {
      console.log("La mascota era ", valorAnterior, " y ahora es", nuevoValor);
    },
    comversacion2: {
      inmediate: true,
      deep: true,
      handler: (nuevoValor, valorAnterior) => {
        console.log(
          "La mascota era ",
          valorAnterior,
          " y ahora es",
          nuevoValor
        );
      }
    },

    objectId(nuevoValor) {
      console.log("entramos en el watch");
      let jsoninser = {
        avatar: this.avatar,
        contenido: this.contenido,
        conversacion: this.conversacion,
        divider: true,
        fecha: this.fecha,
        objectId: nuevoValor,
        origen: this.origen,
        sender: this.sender,
        tipo: this.tipo,
        tipoObjeto: 1
      };
      if (
        this.dataDATA[0].objectId != jsoninser.objectId &&
        jsoninser.objectId != "undefined"
      ) {
        this.dataDATA.unshift(jsoninser);
      }
      console.log(this.dataDATA);
    }
  },

  methods: {
    insertar() {
      let valorInser = JSON.parse(localStorage.mensajenuevo);
      if (
        this.dataDATA[0].objectId != valorInser.objectId &&
        valorInser.objectId != "undefined"
      ) {
        this.dataDATA.unshift(valorInser);
      }
    },
    InvocarChat(index) {
      localStorage.chatUSER = this.dataDATA[index].sender;
      localStorage.idChatUser = this.dataDATA[index].conversacion;
      localStorage.objectidCliente = this.dataDATA[index].objectId;
      this.origen = this.dataDATA[index].origen;
      localStorage.paginaOrigen = this.dataDATA[index].paginaOrigen;
      this.idChatUser = localStorage.idChatUser;
      this.chatActive = localStorage.chatUSER;
      this.historialChat();
    },
    async insertarChat() {
      if (this.dataHis2 != "") {
        let itemInser = {
          idMensaje: "mlse-23-23",
          Mensaje: this.dataHis2,
          sender:
            localStorage.nombre == this.integrantes.sender
              ? this.integrantes.sender
              : localStorage.nombre,
          senderId: localStorage.nombre == this.integrantes.sender ? "2" : "3"
        };

        let insert = [];
        for (const iterator of this.dataHis) {
          insert.push(iterator);
        }

        insert.push(itemInser);
        let s = JSON.stringify(insert);
        // console.log(s);
        // let sa = s.replace("[", "");
        // sa = sa.replace("]", "");
        var stringJSON = s;
        // console.log(stringJSON);
        console.log(this.dataDATA);
        this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(`mutation AgregarChat {
        updateTblStorage(input:{objectId:"${
          this.idChatUser
        }",tipoObjeto:1213,contenidoConversacion:${JSON.stringify(
            stringJSON
          )}}) {
         objectId
          tipoObjeto
          contenidoConversacion
        }
      }`)
        );

        // si quiero actulizar el chat contenido
        // hacer el put al dataDATA que con el index del arrat que es idchatuser

        // this.$Amplify.API.graphql(
        //   this.$Amplify.graphqlOperation(`mutation UpdateContenido {
        //   updateTblStorage(input:{objectId:"${localStorage.objectidCliente}",tipoObjeto:1,contenido:"${this.dataHis2}"}) {
        //    objectId
        //     tipoObjeto
        //     contenidoConversacion
        //   }
        // }`)
        // );

        itemInser = {};
        // let tkn =
        //   "EAAl7jeIK3yUBACFcFwCToDBsBnyaOinDFCLOxUxLQfqRurFjl96U78PGoQIVzZB2e1l8Ep6VjWWwrAFo1aPIbANl4dILpaeE6ZBM4ZB91xr3NN3rvlJGowm4r32D4bqRPkKFNHtBSNbWn6vLVNPq0UZBHMSdaIbXQE8OfaZBymgZDZD";
        // let tkn =
        //   "EAAl7jeIK3yUBANzMF10ZBFoh5mUKVICKTNZAufkMhsN2pd5J8SdxquyoZCBxgF8ET5N4MJhiZAxR1BLTVjYdZBxZCxIZBZAv4q7ariaM3fOjeELQCZBZA5ZCWP5DZBaZCgZAvREqQqjfifanorCN7sEMUYqR8NAZCStSUgmkxjRqTgtjjn8UlL9J09zdEnj";
        stringJSON = "";
        if (this.origen == "Messenger") {
          let data = await this.recovertkn(localStorage.paginaOrigen);
          let tkn = data.response;
          let URL = `https://graph.facebook.com/v7.0/me/messages?access_token=${tkn}`;
          let request_body = {
            recipient: {
              id: localStorage.objectidCliente
            },
            message: { text: this.dataHis2 }
          };
          axios
            .post(URL, request_body)
            .then(response => (this.responseData = response.data))
            .catch(error => {
              console.log(error);
            });
        } else if (this.origen == "Telegram") {
          let KEY = "1379633388:AAHKR_fzK2a2O7oMjzMLio1yBLS_HaJ4oyg";
          let URL = `https://api.telegram.org/bot${KEY}/sendMessage`;
          let params = {
            chat_id: localStorage.objectidCliente,
            text: this.dataHis2
          };
          axios
            .post(URL, params)
            .then(response => (this.responseData = response.data))
            .catch(error => {
              console.log(error);
            });
        }
        this.historialChat();
        this.conversaciones();
      }
    },

    async recovertkn(objectId) {
      let datos3 = await this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(`query recoverTKN {
    getTblStorage(objectId:"${objectId}",tipoObjeto:1214) {
      objectId
      tipoObjeto
      fecha
      nombreWeb
      accesToken
    }
  }
`)
      );
      let response = datos3.data.getTblStorage.accesToken;
      return { response };
    },

    async conversaciones() {
      let datos = await this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(`
query historialSMS {
    queryTblStoragesByTipoObjetoFechaIndex(
     tipoObjeto:1
    ) {
      items {
      	objectId,
        tipoObjeto,
        sender
        senderId
        origen
        tipo
        contenido
        fecha
        avatar
        divider
        conversacion
        paginaOrigen
      }   
    }
  }`)
      );
      this.dataDATA = [];
      console.log(datos);
      for (const iterator of datos.data.queryTblStoragesByTipoObjetoFechaIndex
        .items) {
        this.dataDATA.push(iterator);
      }
      // console.log(this.dataDATA);
    },
    async historialChat() {
      let datos2 = await this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(`query getHistorial {
    getTblStorage(objectId:"${this.idChatUser}",tipoObjeto:1213) {
      objectId
      tipoObjeto
      fecha
      origen
      contenidoConversacion
    }
  }
`)
      );
      // console.log(datos2.data.getTblStorage.contenidoConversacion);
      let guardaremos = JSON.parse(
        datos2.data.getTblStorage.contenidoConversacion
      );
      // console.log(guardaremos);
      let contadorCliente = 0;
      let contadorSoporte = 0;
      let extra = 0;
      this.dataHis2 = "";
      this.dataHis = [];
      this.integrantes = [];

      for (const iterator of guardaremos) {
        this.dataHis.push(iterator);
        let push = {
          sender: iterator.sender,
          senderId: iterator.senderId
        };
        // console.log(push);

        if (iterator.senderId == "1") {
          if (contadorCliente == 0) {
            this.integrantes.push(push);
            contadorCliente = contadorCliente + 1;
          }
        } else {
          if (iterator.senderId == "2") {
            if (contadorSoporte == 0) {
              this.integrantes.push(push);
              contadorSoporte = contadorSoporte + 1;
            }
          } else if (iterator.senderId == "3") {
            if (extra == 0) {
              this.integrantes.push(push);
              extra = extra + 1;
            }
          }
        }
        // console.log("ESte es el contenido: " + this.integrantes);
      }
    }
  }
};
</script>

<style scoped>
.containe-general {
  align-content: end;
}
/* .chat-Invisible {
  padding-top: 1%;
  padding-left: 2%;
  padding-right: 2%;
  padding-bottom: 0.1%;
  margin: 1%;
  background-color: transparent;
  border-radius: 15px;
  color: transparent;
  word-wrap: break-word;
  width: 50%;
} */

.chat-container {
  background-color: #5bc500;

  border: 2px solid #008f4f;
  margin: 1%;
  padding-left: 10px;
  color: #fff;
  border-radius: 15px;
}
.chat-container2 {
  background-color: #00a9e0;
  border: 2px solid #1c7ca6;
  margin: 1%;
  padding-left: 10px;
  color: #fff;
  border-radius: 15px;
}
.chat-containerUser {
  margin: 1%;
  padding-right: 700px;
  background-color: #00a9e0;
  border-radius: 15px;
  color: #fff;
}
.envio {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.chat-messages {
  padding: 30px;
  max-height: 500px;
  overflow-y: scroll;
}
.chat-messages .message {
  padding: 10px;
  margin-bottom: 15px;
  background-color: var(--light-color);
  border-radius: 5px;
}

.chat-messages .message .meta {
  font-size: 15px;
  font-weight: bold;
  color: var(#00a9e0);
  opacity: 0.7;
  margin-bottom: 7px;
}

.chat-messages .message .meta span {
  color: #50535a;
}

.chat-form-container {
  padding: 5px 7px;
  font-family: Open Sans;
  font-size: 14px;
}

.chat-form-container form {
  display: flex;
}

.chat-form-container input[type="text"] {
  font-size: 14px;
  padding: 5px;
  flex: 1;
  color: #50535a;
}

.message {
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: lightskyblue;
}
.chat-container .username {
  font-size: 18px;
  font-weight: bold;
}
.fontdic {
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 700;
  text-align: start;
  margin: 20px;
  padding: 0px;
}
.fontdic2 {
  font-family: Open Sans;
  font-size: 13px;
  font-weight: 700;
  text-align: start;
  margin: 1px;
  padding: 0px;
}
.fontdic3 {
  font-family: Open Sans;
  font-size: 13px;
  font-weight: 700;
  text-align: start;
  margin: 8px;
  padding: 0px;
}
.radio {
  font-family: Lato;
  font-size: 7px !important;
  text-align: start;
  margin: 0px;
  padding: 0px;
}

.fuenteDeatelle {
  font-family: Lato;
  font-size: 13px;
  font-weight: 100;
  text-align: start;
  margin: 8px;
  padding: 0px;
  color: grey;
}

.tile:hover {
  border-radius: 10px;
  background: #d8edff;
}
.tile_active {
  border: 2px solid #0d8cff;
  background: #d8edff;
  border-radius: 10px;
}
</style>
