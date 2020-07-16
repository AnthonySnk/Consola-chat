<template>
  <v-app>
    <v-container class="text-sm-left">
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12">
          <v-card-title>
            <v-icon color="#0088cc" class="mr-4">fab fa-telegram</v-icon>
            <h2>Integración Telegram</h2>
          </v-card-title>
          <p>Para conectarte por favor sigue los siguientes pasos</p>
          <v-alert v-if="bot.error==true" dense type="error">Token no valido</v-alert>
          <v-alert v-else-if="bot.error==false" dense type="success">Guardado</v-alert>

          <h4>Ingresa las siguientes credenciales para conectarte al canal de Telegram</h4>
          <v-row>
            <v-col cols="12" sm="12">
              <h4>Token del BOT</h4>
              <v-text-field sm="4" label="Inserta el bot token aqui" v-model="bot.token"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <h4>Nombre de usuario del bot</h4>
              <v-text-field label="Autocompletado" readonly v-model="bot.nombre"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <h4>Nombre del bot</h4>
              <v-text-field label="Autocompletado" readonly v-model="bot.NombreBOT"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center" md="6">
              <v-btn
                @click="agregarBOT()"
                rounded
                dark
                block
                height="3rem"
                color="#5BC500"
                type="submit"
                single-line
              >
                <v-icon color="red"></v-icon>Conectar
              </v-btn>
            </v-col>
            <v-col class="text-center" md="6">
              <v-btn @click="DesconectarBOT()" rounded dark block height="3rem" color="#00A9E0">
                <v-icon color="red"></v-icon>DESCONECTAR
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn
                to="/integraciones/componente7"
                rounded
                block
                height="3rem"
                width="400px"
                color="transparent"
              >
                <v-icon color="red" class="mr-4"></v-icon>IR A CONEXIONES
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>



<script>
import axios from "axios";
export default {
  data() {
    return {
      bot: {
        token: "",
        nombre: "",
        NombreBOT: "",
        estado: "",
        error: null,
        nombreUser: ""
      }
    };
  },
  mounted() {
    if (localStorage.nombreUser) {
      this.bot.nombreUser = localStorage.nombreUser;
    }
    if (localStorage.token) {
      this.bot.token = localStorage.token;
    }
  },

  methods: {
    agregarBOT() {
      //     `https://api.telegram.org/bot996475661:AAHp5WsC0nFZHNV_-JSiYfpr5ixEQxVi6KI/getMe`
      let ulrTOken = `https://api.telegram.org/bot${this.bot.token}/getMe`;

      axios
        .get(ulrTOken)
        .then(response => {
          this.info = response.data;
          console.log(this.info);
          this.bot.nombre = this.info.result.first_name;
          this.bot.NombreBOT = this.info.result.username;
          this.bot.error = false;
          this.insertBOT();
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
          this.bot.error = true;
        })
        .finally(() => (this.loading = false));
    },
    insertBOT() {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(`mutation InsertarBOT{
       createTblStorage(input:{objectId:"${this.bot.token}",tipoObjeto:1212,fecha:"2020-06-05",cuenta:"${this.bot.nombreUser}"}){
       objectId
    }
  }`)
      );
      this.bot.error = "";
    },

    DesconectarBOT() {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(` mutation borrarBOT{
       deleteTblStorage(input:{objectId:"${this.bot.token}",tipoObjeto:1212}){
       objectId
    }
  }`)
      );
      this.bot.nombre = "";
      this.bot.NombreBOT = "";
      this.bot.token = "";
    },

    QueryCuentas() {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(`query Cuentas{
  listTblStorages(filter:{cuenta:{contains:"${this.bot.nombreUser}"}}){
    items{objectId}
  }
  }`)
      );
    }
  }
};
</script>

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