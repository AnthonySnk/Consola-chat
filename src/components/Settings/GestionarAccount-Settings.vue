<template>
  <v-app>
    <v-container class="text-sm-left pa-7">
      <v-card-title>
        <h2>Mi Perfil</h2>
      </v-card-title>
      <div>
        <p>Aquí tienes un resumen de la información más relevante de tu usuario.</p>
      </div>
      <!-- =============Datos de usuario===============================-->

      <amplify-connect :query="getTbl_user">
        <template slot-scope="{loading,data,errors}">
          <div v-if="loading">loading ...</div>
          <div v-if="errors.lenght>0">errrors</div>
          <div v-else-if="data">
            <div v-if="!signedIn">
              <amplify-authenticator></amplify-authenticator>
            </div>
            <div v-if="signedIn">
              <v-list-item flat></v-list-item>
              <v-divider></v-divider>
              <v-container class="text-sm-left pa-8">
                <v-row no-gutters>
                  <!-- =============Foto de perfil===============================-->
                  <!-- <div class="connect-form">
                    <h2>Selecciona tu foto de perfil</h2>
                    <h2></h2>
                    <v-avatar aling="center" size="150px">
                      <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                    </v-avatar>
                    <input type="file" accept="image/*" />
                  </div>-->
                  <!-- =========================================================== -->

                  <div class="connect-form">
                    <p></p>
                    <h2>Detalles del Usuario</h2>
                    <h2></h2>
                    <label>
                      Usuario
                      <input
                        type="text"
                        v-model="data.getTblUser.idUser"
                        readonly
                        :placeholder="idAgente"
                      />
                    </label>
                    <h2></h2>
                    <label>
                      Rol
                      <input
                        type="text"
                        v-model="data.getTblUser.rol"
                        readonly
                        :placeholder="appid"
                      />
                    </label>
                    <h2></h2>
                    <label>
                      Departamento
                      <h2></h2>
                      <input
                        type="text"
                        v-model="data.getTblUser.departamento"
                        readonly
                        :placeholder="secretKey"
                      />
                    </label>
                    <label>
                      E-mail
                      <h2></h2>
                      <input
                        type="text"
                        v-model="data.getTblUser.correo"
                        readonly
                        :placeholder="secretKey"
                      />
                    </label>
                    <label>
                      Dirección
                      <h2></h2>
                      <input
                        type="text"
                        v-model="data.getTblUser.direccion"
                        readonly
                        :placeholder="secretKey"
                      />
                    </label>
                  </div>
                </v-row>
              </v-container>
            </div>
          </div>
        </template>
      </amplify-connect>
      <!-- =========================================================== -->

      <div>
        <h4>Datos Personales</h4>
        <form class="connect-form">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="nombre" :rules="TextRules" label="Nombre"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="apellido" :rules="TextRules" label="Apellido"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="email" type="text" id="account-email" label="Email"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="direccion" :rules="TextRules" label="Dirección"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field :rules="TellRules" v-model="telefono" label="Teléfono"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field :rules="TellRules" v-model="telefonoEmpresa" label="Teléfono Empresa"></v-text-field>
            </v-col>
          </v-row>

          <div class="text-center">
            <v-btn
              dark
              rounded
              height="3rem"
              width="200px"
              color="#00A9E0"
              onclick="alert('Datos actualizados exitosamente')"
              @click="submit"
            >Guardar</v-btn>
          </div>
        </form>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
import { components } from "aws-amplify-vue";

// eslint-disable-next-line no-unused-vars
var nombreUser;
export default {
  data: () => ({
    nombre: "",

    apellido: "",
    direccion: "",
    telefono: "",
    telefonoEmpresa: "",
    email: ""
  }),

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
      rol
      correo
      direccion
    }
  }`);
    },

    userpanel() {
      return nombreUser;
    }
  },

  methods: {
    submit() {
      // eslint-disable-next-line no-unused-vars
      var update2 = {
        idUser: this.userpanel,
        direccion: this.direccion,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.email,
        telefono: this.telefono,
        telefonoEmpresa: this.telefonoEmpresa
      };

      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(`mutation updateTblUser {
    updateTblUser(input: {idUser:"${this.userpanel}",nombre:"${this.nombre}",apellido:"${this.apellido}",telefono:"${this.telefono}",correo:"${this.email}",direccion:"${this.direccion}",telefonoEmpresa:"${this.telefonoEmpresa}"}) {
idUser
    }
  }
  `)
      );
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
        location.reload();
      } else {
        this.signedIn = false;
        //nombreUser = "";
      }
    });
    return nombreUser;
  }
};
</script>

<style>
.connect-form h2 {
  color: #00a9e0;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
}
input[readonly] {
  background: #f2f2f2;
}
form label {
  font-size: 14px;
  line-height: 28px;
}
input,
select,
textarea {
  font-family: "Inter", sans-serif;
  font-weight: normal;
  width: 100%;
  color: #8c8c8c;
  padding: 10px 14px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 7px 17px rgba(51, 51, 51, 0.07);
  box-shadow: 0px 7px 17px rgba(51, 51, 51, 0.07);
  border-radius: 6px;
  border: 1px solid transparent;
  outline: none;
  font-size: 14px;
  line-height: 16px;
}
p.detail-info {
  font-size: 13px;
  color: #39393a;
  margin-bottom: 18px;
  border-left: 3px solid #c4c4c4;
  padding-left: 12px;
}
</style>