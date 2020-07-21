<template>
  <v-app>
    <v-container class="text-sm-left">
      <v-row no-gutters>
        <v-card-text>
          <v-card-title>
            <v-icon color="#0078FF" class="mr-4">fab fa-facebook-messenger</v-icon>
            <h2>Integración Facebook</h2>
          </v-card-title>

          <p>Facebook Messenger es un servicio de mensajería instantánea y una aplicación de software desarrollada por Facebook. Esta integración le permite conectarse con personas a través de dispositivos y plataformas.</p>

          <v-row>
            <v-col cols="12" sm="12" center>
              <h4>Ingresa tu app ID</h4>
              <v-text-field label="appId" v-model="appId" readonly></v-text-field>
            </v-col>
            <v-col class="text-center">
              <v-btn
                color="transparent"
                @click="logInWithFacebook"
                block
                height="3rem"
                width="400px"
              >
                <v-icon color="#0078FF" class="mr-4">fab fa-facebook-messenger</v-icon>Conectate con Facebook
              </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
              <v-btn
                color="#00A9E0
"
                rounded
                dark
                block
                height="3rem"
                @click="logout"
                width="400px"
              >
                <v-icon color="red" class="mr-4"></v-icon>DESCONECTAR
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.cssbton {
  border: 1px solid #5bc500;
}

h4.caption {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  color: #5bc500;
  line-height: 19px;
  -webkit-box-align: left;
  -ms-flex-align: left;
  align-items: left;
  -webkit-box-pack: left;
  -ms-flex-pack: left;
  justify-content: left;
  display: block;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  line-height: 1.4;
}
h2 {
  display: block;

  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
h3 {
  display: block;

  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>

<script>
import axios from "axios";
const WS = new WebSocket(
  "wss://0cvzgb8kn9.execute-api.us-east-1.amazonaws.com/beta"
);
export default {
  created() {
    WS.onopen = function() {
      console.log("Comunicación abierta con el servidor WS.");
      WS.send(
        JSON.stringify({
          action: "chat",
          message: { MENSAJE: "MENSAJE DE PRRUEBA" }
        })
      );
    };
  },
  data() {
    return {
      appId: "2669124103364389",
      accessToken: "",
      fechaEXpire: "",
      secret: "2b5df48dea02b18b848c6f7ff80c8000",
      redirect_uri: "https://www.facebook.com/connect/login_success.html",
      responseData: "",
      userID: "",
      nameuser: "",
      DATAPAGE: []
    };
  },
  name: "facebookLogin",
  methods: {
    async logInWithFacebook() {
      if (this.appId != "") {
        await this.loadFacebookSDK(document, "script", "facebook-jssdk");
        await this.initFacebook(this.appId);
        await this.login(this.appId);
        // await this.openWindow(this.appId);
        return false;
      } else alert("No debe estar vácio tu AppID");
    },
    openWindow(appId) {
      console.log("entramos");
      window.open(
        `https://www.facebook.com/v7.0/dialog/oauth?client_id=${appId}&response_type=code&display=popup&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=pages_read_engagement`,
        "ventana1",
        "width=auto,height=250,scrollbars=NO"
      );
    },

    async login(appId) {
      window.FB.login(async function(fase1) {
        ///==========================================================///
        ///recuperamos datos importantes como el tkn
        ///==========================================================///
        console.log("Datos obtenidos en e Login de Usuario");
        console.log(fase1);
        WS.send(
          JSON.stringify({
            action: "chat",
            message: {
              userAction: "valdiarTOken",
              data: {
                object: "Consola - verify",
                acces_token: fase1.authResponse.accessToken
              }
            }
          })
        );
        if (fase1.authResponse) {
          console.log("Bienvenido!  Buscando tu informacion.... ");
          window.FB.api("/me", async function(response) {
            console.log("Gusto de verte, " + response.name + ".");
            await window.FB.api(
              "/me",
              "GET",
              { fields: "id,name,email" },
              function(response) {
                ///==========================================================///
                //abriemos la ventana para el login
                ///==========================================================///
                this.userID = response.id;
                this.nameuser = response.name;

                console.log("Datos personales del USER");
                console.log(response);
                let redirect_uri = `https://www.facebook.com/connect/login_success.html`;
                let win = window.open(
                  `https://www.facebook.com/v7.0/dialog/oauth?response_type=token&display=popup&client_id=${appId}&redirect_uri=${redirect_uri}&scope=pages_messaging,pages_read_engagement,pages_read_engagement,public_profile`,
                  "ventana1",
                  "width=auto,height=200,scrollbars=NO"
                );
                var interval = window.setInterval(function() {
                  let flag = "";
                  try {
                    if (win == null || win.closed) {
                      window.clearInterval(interval);
                      window.FB.api("/me/permissions ", "GET", function(
                        response
                      ) {
                        console.log("Los Permisos");
                        console.log(response);
                        for (let iterator of response.data) {
                          ///==========================================================///
                          //validaremos si los permisos seleccionados correspnden a los necesaios
                          ///==========================================================///
                          if (iterator.permission == "pages_messaging") {
                            if (iterator.status != "granted") {
                              alert(
                                "Los Permisos de Mensajeria no estan Activados!"
                              );
                              let win2 = window.open(
                                `https://www.facebook.com/v7.0/dialog/oauth?response_type=token&display=popup&client_id=${appId}&redirect_uri=${redirect_uri}&scope=pages_messaging,pages_read_engagement,pages_read_engagement,public_profile`,
                                "ventana1",
                                "width=auto,height=200,scrollbars=NO"
                              );
                              var interval2 = window.setInterval(function() {
                                if (win2 == null || win2.closed) {
                                  window.clearInterval(interval2);
                                  window.FB.api(
                                    "/me/permissions ",
                                    "GET",
                                    function(response) {
                                      for (let iterator of response.data) {
                                        if (
                                          iterator.permission ==
                                          "pages_messaging"
                                        ) {
                                          if (iterator.status != "granted") {
                                            alert(
                                              "No podemos continuar el proceso automaticamente, CLICK en el botón\nInicia sesión con Messegnger NUEVAMENTE "
                                            );
                                            flag = "PersonaNoACEPTO";
                                            console.log(flag);
                                          } else {
                                            flag = "userAcepto";
                                            ///==========================================================///
                                            //VOLVEREMOS A AEJCUTAR LAS DEMAS
                                            ///==========================================================///
                                            // obtendremos los id de las paginas a las que tenemos acceso
                                            ///==========================================================///
                                            let _pagesOurControl = `https://graph.facebook.com/${this.userID}/accounts?access_token=${fase1.authResponse.accessToken}`;

                                            axios
                                              .get(_pagesOurControl)
                                              .then(function(response) {
                                                console.log(response);
                                                let arrayPage = [];
                                                for (let iterator of response
                                                  .data.data) {
                                                  let jsonPage = {
                                                    access_token:
                                                      iterator.access_token,
                                                    nombreWeb: iterator.name,
                                                    idPage: iterator.id
                                                  };

                                                  //ENVIAREMOS LOS DATOS AL LAMBDA
                                                  WS.send(
                                                    JSON.stringify({
                                                      action: "chat",
                                                      message: {
                                                        userAction: "PAT",
                                                        data: {
                                                          access_token:
                                                            iterator.access_token,
                                                          nombreWeb:
                                                            iterator.name,
                                                          idPage: iterator.id
                                                        }
                                                      }
                                                    })
                                                  );

                                                  arrayPage.push(jsonPage);
                                                  window.FB.api(
                                                    `/${iterator.id}/subscribed_apps`,
                                                    "POST",
                                                    {
                                                      subscribed_fields:
                                                        "messages",
                                                      access_token:
                                                        iterator.access_token
                                                    },
                                                    function(response) {
                                                      console.log(response);

                                                      if (
                                                        response.error.code ==
                                                        200
                                                      ) {
                                                        alert(
                                                          `No ha habilitador permisos de mensajes en ${iterator.name}`
                                                        );
                                                      }
                                                    }
                                                  );
                                                }

                                                console.log(arrayPage);
                                              })
                                              .catch(function(error) {
                                                console.log(error);
                                              });
                                            ///==========================================================///
                                            //VAMOS A GENERAR UN APP ACCES TOKEN
                                            ///==========================================================///

                                            let AAT = `https://graph.facebook.com/oauth/access_token?client_id=2669124103364389&client_secret=2b5df48dea02b18b848c6f7ff80c8000&grant_type=client_credentials`;
                                            let toknapp;
                                            axios
                                              .get(AAT)
                                              .then(function(response) {
                                                console.log("EL AAT");
                                                console.log(response.data);
                                                toknapp =
                                                  response.data.access_token;
                                              })
                                              .catch(function(error) {
                                                console.log(error);
                                              });

                                            ///==========================================================///
                                            //CAMBIAREMOS EL TOKEN POR UN ACCCES TOKEN LARGO
                                            ///==========================================================///

                                            let cambioAccesToken = `https://graph.facebook.com/v7.0/oauth/access_token?grant_type=fb_exchange_token&client_id=2669124103364389&client_secret=2b5df48dea02b18b848c6f7ff80c8000&fb_exchange_token=${fase1.authResponse.accessToken}`;

                                            // let toknapp =
                                            //   "2669124103364389|ITgmB7aQot3yXldEKVbOUcZ_A4w";
                                            axios
                                              .get(cambioAccesToken)
                                              .then(function(response) {
                                                console.log("cambio");
                                                console.log(response.data);
                                                WS.send(
                                                  JSON.stringify({
                                                    action: "chat",
                                                    message: {
                                                      userAction: "messenger",
                                                      data: {
                                                        object:
                                                          "token de la página",
                                                        pat:
                                                          response.data
                                                            .access_token
                                                      }
                                                    }
                                                  })
                                                );

                                                window.FB.api(
                                                  "/2669124103364389/subscriptions",
                                                  "POST",
                                                  {
                                                    object: "user",
                                                    callback_url:
                                                      "https://kbsv9g0mp5.execute-api.us-east-1.amazonaws.com/facebook",
                                                    fields: "message_sends",
                                                    active: true,
                                                    /// token nuevo response.data.access_token
                                                    verify_token:
                                                      "EAAl7jeIK3yUBANSn6eSBE7kuWrRB9WE6",
                                                    access_token: toknapp
                                                  },
                                                  function(response) {
                                                    console.log(response);
                                                    response;
                                                  }
                                                );
                                              })
                                              .catch(function(error) {
                                                console.log(error);
                                              });
                                          }
                                        }
                                      }
                                    }
                                  );
                                }
                              });
                            }
                            ///==========================================================///
                            //ESTE ES ELSE DE LA PRIMERA VES QUE TE PREGUNTA LOS PERMISOS
                            ///==========================================================///
                            else {
                              ///==========================================================///
                              // obtendremos los id de las paginas a las que tenemos acceso
                              ///==========================================================///

                              let _pagesOurControl = `https://graph.facebook.com/${this.userID}/accounts?access_token=${fase1.authResponse.accessToken}`;
                              localStorage.datosPage = [];
                              axios
                                .get(_pagesOurControl)
                                .then(function(response) {
                                  console.log(response);
                                  let arrayPage = [];
                                  for (let iterator of response.data.data) {
                                    let jsonPage = {
                                      access_token: iterator.access_token,
                                      nombreWeb: iterator.name,
                                      idPage: iterator.id
                                    };
                                    arrayPage.push(jsonPage);
                                    //ENVIAREMOS LOS DATOS AL LAMBDA
                                    WS.send(
                                      JSON.stringify({
                                        action: "chat",
                                        message: {
                                          userAction: "PAT",
                                          data: {
                                            access_token: iterator.access_token,
                                            nombreWeb: iterator.name,
                                            idPage: iterator.id
                                          }
                                        }
                                      })
                                    );
                                    window.FB.api(
                                      `/${iterator.id}/subscribed_apps`,
                                      "POST",
                                      {
                                        subscribed_fields: "messages",
                                        access_token: iterator.access_token
                                      },
                                      function(response) {
                                        console.log(response);

                                        if (response.error.code == 200) {
                                          alert(
                                            `No ha habilitador permisos de mensajes en ${iterator.name}`
                                          );
                                        }
                                      }
                                    );
                                  }

                                  console.log(arrayPage);
                                })
                                .catch(function(error) {
                                  console.log(error);
                                });
                              ///==========================================================///
                              //VAMOS A GENERAR UN APP ACCES TOKEN
                              ///==========================================================///

                              let AAT = `https://graph.facebook.com/oauth/access_token?client_id=2669124103364389&client_secret=2b5df48dea02b18b848c6f7ff80c8000&grant_type=client_credentials`;
                              let toknapp;
                              axios
                                .get(AAT)
                                .then(function(response) {
                                  console.log("EL AAT");
                                  console.log(response.data);
                                  toknapp = response.data.access_token;
                                })
                                .catch(function(error) {
                                  console.log(error);
                                });

                              ///==========================================================///
                              //CAMBIAREMOS EL TOKEN POR UN ACCCES TOKEN LARGO
                              ///==========================================================///
                              let cambioAccesToken = `https://graph.facebook.com/v7.0/oauth/access_token?grant_type=fb_exchange_token&client_id=2669124103364389&client_secret=2b5df48dea02b18b848c6f7ff80c8000&fb_exchange_token=${fase1.authResponse.accessToken}`;

                              // let toknapp =
                              //   "2669124103364389|ITgmB7aQot3yXldEKVbOUcZ_A4w";

                              axios
                                .get(cambioAccesToken)
                                .then(function(response) {
                                  console.log("cambio");
                                  console.log(response.data);
                                  WS.send(
                                    JSON.stringify({
                                      action: "chat",
                                      message: {
                                        userAction: "messenger",
                                        data: {
                                          object: "token de la página",
                                          pat: response.data.access_token
                                        }
                                      }
                                    })
                                  );

                                  window.FB.api(
                                    "/2669124103364389/subscriptions",
                                    "POST",
                                    {
                                      object: "user",
                                      callback_url:
                                        "https://kbsv9g0mp5.execute-api.us-east-1.amazonaws.com/facebook",
                                      fields: "message_sends",
                                      active: true,
                                      /// token nuevo response.data.access_token
                                      verify_token:
                                        "EAAl7jeIK3yUBANSn6eSBE7kuWrRB9WE6",
                                      access_token: toknapp
                                    },
                                    function(response) {
                                      console.log(response);
                                    }
                                  );
                                })
                                .catch(function(error) {
                                  console.log(error);
                                });
                            }
                          }
                        }
                      });
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }, 1000);
              }
            );

            // let URLCAMBIO = `https://graph.facebook.com/v7.0/oauth/access_token?client_id=${appId}&redirect_uri=${this.redirect_uri}&client_secret=${this.secret}&code=${this.accessToken}`;
            // axios
            //   .get(URLCAMBIO)
            //   .then(response => (this.responseData = response.data))
            //   .catch(error => {
            //     console.log(error);
            //   });
          });
        } else {
          console.log("El usuario cancelo la peticion o no estaba autorizado");
        }
      });
    },

    async initFacebook(appId) {
      window.fbAsyncInit = function() {
        window.FB.init({
          // 2669124103364389
          appId: appId,
          cookie: true,
          xfbml: true,
          version: "v7.0"
        });
        window.FB.AppEvents.logPageView();
      };
    },

    async logout(response) {
      if (response.token != null || response.token != "")
        window.FB.logout(response.token);
      console.log("Nos veremos Pronto");
    },
    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
  }
};

//tokenEAAl7jeIK3yUBAGBLeNKapFeCXelWjNhaOVZAiRZABWVZCkgZARO8axgfnFjQE0euUwI5sHScL1vRO79DGzmOrx33TxVJtMPjYHNTkv8VeKXE23QY5lN6pHIDZCN2iAMBTNqXvf0f9TDCd3f9y9BOxYZBjKQd9rfNqH0WtSd6OgbQZDZD
</script>
