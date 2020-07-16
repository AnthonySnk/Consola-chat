<template>
  <amplify-connect :query="getTbl_user">
    <template slot-scope="{loading,data,errors}">
      <div v-if="loading">loading ...</div>
      <div v-if="errors.lenght>0">errrors</div>
      <div v-else-if="data">
        <div v-if=" data.getTblUser.rol=='Supervisor' || data.getTblUser.rol=='Administrador' ">
          <v-container class="text-sm-left">
            <v-row no-gutters>
              <v-card-text>
                <v-card-title>
                  <v-icon color="blue" class="mr-4">fas fa-user-friends</v-icon>
                  <h2>Gestion de Agentes</h2>
                </v-card-title>
                <!-- ===================EJEMPLO USANDO GRAPHQL=========== -->
                <!-- 
        <amplify-connect :query="listTblUsers">
          <template slot-scope="{loading,data,errors}">
            <div v-if="loading">loading ...</div>
            <div v-if="errors.lenght>0">errrors</div>
                <div v-else-if="data">{{data}}</div>-->
                <!-- <div v-for="item in data.listTblUsers.items" :key="item.idUser">
              <p>
                idUser: {{item.idUser}}
                <br />
                Departamento: {{item.departamento}}
                <br />
                Rol: {{item.rol}}-->
                <!-- </p>
            </div>
          </template>
                </amplify-connect>-->
                <!-- ======================= -->
                <div class="mt-4">
                  <p>Puede crear un nuevo usuario en esta página</p>
                </div>
                <div id="app">
                  <v-btn to="/settings/FormAgentes" color="#00A9E0" dark class="mb-2" v-on="on">
                    <v-icon color="white" class="mr-4">fas fa-user-friends</v-icon>Agregar Nuevo Usuario
                  </v-btn>
                  <!-- <v-app id="inspire">
            <v-data-table :headers="headers" :items="Option" class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn to="/settings/FormAgentes" color="#00A9E0" dark class="mb-2" v-on="on">
                        <v-icon color="white" class="mr-4">fas fa-user-friends</v-icon>Agregar Nuevo Usuario
                      </v-btn>
                  </template>-->
                  <!-- <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Nombre Agente"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.Rol" label="Rol"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.Dep" label="Departamento"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.correo" label="Correo"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                  </v-card-text>-->

                  <!-- <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                  </v-card-actions>-->
                  <!-- </v-card> -->
                  <!-- </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
                  </v-data-table>-->
                  <!-- </v-app> -->
                </div>
              </v-card-text>
            </v-row>
          </v-container>
        </div>

        <div v-if="data.getTblUser.rol=='Agente' ">
          <v-row>
            <v-col class="text-center">
              <v-btn to="/" rounded block height="3rem" width="400px" color="transparent">
                <v-icon color="green" class="mr-4">arrow_back</v-icon>Regresar
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </template>
  </amplify-connect>
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
  components: {
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
      rol: localStorage.rol,
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
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.rol != "Agente") {
      next();
    } else {
      next({
        name: "Home"
      });
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