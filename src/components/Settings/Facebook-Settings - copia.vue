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
// import axios from "axios";
export default {
  data() {
    return {
      appId: "2669124103364389"
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
        `https://www.facebook.com/v7.0/dialog/oauth?response_type=token&display=popup&client_id=${appId}&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=pages_read_engagement`,
        "ventana1",
        "width=auto,height=250,scrollbars=NO"
      );
    },

    login(appId) {
      window.FB.login(function(response) {
        if (response.authResponse) {
          console.log("Bienvenido!  Buscando tu informacion.... ");
          window.FB.api("/me", function(response) {
            console.log("Gusto de verte, " + response.name + ".");
            console.log(this.appId);
            window.FB.api("/me", "GET", { fields: "id,name" }, function(
              response
            ) {
              console.log(response);
              // let redirect_uri = `https://www.facebook.com/connect/login_success.html`;
              let redirect_uri = `http://localhost:8080/?#/integraciones/componente4`;
              // let secret = `2b5df48dea02b18b848c6f7ff80c8000`;
              window.open(
                `https://www.facebook.com/v7.0/dialog/oauth?response_type=token&display=popup&client_id=${appId}&redirect_uri=${redirect_uri}&scope=pages_messaging,pages_read_engagement,pages_read_engagement,public_profile`,
                "ventana1",
                "width=auto,height=200,scrollbars=NO"
              );
              console.log(window.location);
              // let URLCAMBIO = `https://graph.facebook.com/v7.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirect_uri}&client_secret=${secret}&code={code-parameter}`;
              // axios
              //   .get(URLCAMBIO)
              //   .then(response => (this.responseData = response.data))
              //   .catch(error => {
              //     console.log(error);
              //   });
            });
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
