<template>
  <v-app>





                <amplify-connect :query="getTbl_user">
                  <template slot-scope="{loading,data,errors}">
                    <div v-if="loading">loading ...</div>
                    <div v-if="errors.lenght>0">errrors</div>
                    <div v-else-if="data">
                      <div
                        v-if=" data.getTblUser.rol=='Supervisor' || data.getTblUser.rol=='Administrador' "
                      >
                        <v-container class="text-sm-left">
      <v-row no-gutters>
        <v-card-text>
          <v-card-title>
            <v-icon color="#25D366" class="mr-4">fab fa-whatsapp</v-icon>
            <h2>Integración WhatsApp</h2>
          </v-card-title>

          <p>Para conectar sigue los siguientes pasos</p>

          <h4>Nombre de WhatsApp</h4>
          <v-form>
            <v-text-field label="Nombre de WhatsApp"></v-text-field>
          </v-form>

          <h4>Token de WhatsApp</h4>
          <v-form>
            <v-text-field label="Inserta el token aqui"></v-text-field>
          </v-form>

          <v-row>
            <v-col class="text-center">
              <v-btn
                to="/integraciones/componente6"
                rounded
                dark
                block
                height="3rem"
                width="400px"
                color="#5BC500"
              >
                <v-icon color="red" class="mr-4"></v-icon>Conectar
              </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
              <v-btn to rounded dark block height="3rem" width="400px" color="#00A9E0">
                <v-icon color="red" class="mr-4"></v-icon>DESCONECTAR
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-row>
    </v-container>
                         

                      </div>

                      

                      <div
                        v-if="data.getTblUser.rol=='Agente' "
                      >
                        <v-row>
                          <v-col class="text-center">
                            <v-btn
                              to="/"
                              rounded
                              block
                              height="3rem"
                              width="400px"
                              color="transparent"
                            >
                              <v-icon color="green" class="mr-4">arrow_back</v-icon>Regresar
                            </v-btn>
                          </v-col>
                        </v-row>

                       
                      </div>

                         
                          

                    </div>
                  </template>
                </amplify-connect>

  </v-app>
  

</template>

<script>
// eslint-disable-next-line no-unused-vars
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
import { components } from "aws-amplify-vue";
var nombreUser;
// const getTbl_user = `
// query GetTblUser {
//     getTblUser(idUser: "${JSON.stringify(nombreUser)}" ) {
//       idUser
//       departamento
//       password
//       permisos
//       rol
//       nombre
//       apellido
//     }
//   }`;

export default {
  Acomponents: {
    ...components
  },
  computed: {
    // listTodosQuery() {
    //   return this.$Amplify.graphqlOperation(listTodosQuery);
    // },
    getTbl_user() {
      return this.$Amplify.graphqlOperation(`
query GetTblUser {
    getTblUser(idUser: "${nombreUser}" ) {
      idUser
      departamento
      password
      permisos
      rol
      nombre
      apellido
    }
  }`);
    },
    userPanel() {
      return nombreUser;
    }
  },

  async beforeCreate() {
    try {
      // eslint-disable-next-line no-unused-vars
      const user = await Auth.currentAuthenticatedUser();
      const awsUser = await Auth.currentUserInfo();

      nombreUser = awsUser.username;
      console.log(nombreUser);
      this.signedIn = true;
    } catch (err) {
      this.signedIn = false;
      //nombreUser = "";
    }
    AmplifyEventBus.$on("authState", info => {
      if (info === "signedIn") {
        this.signedIn = true;
        //location.reload();
      } else {
        this.signedIn = false;
        //nombreUser = "";
      }
    });
    return nombreUser;
  },

  data() {
    return {
      Drawer: true,
      signedIn: false,
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

