
<template>
  <v-app>
    <!-- =============Variable de usuario========== -->

    <v-container class="text-sm-left">
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <div height="auto">
            <!-- =========================================================== -->
            <v-list-item-content>
              <strong>
                <v-list-item-title>
                  <h2>Hola, {{ datosUser.nombre }}</h2>
                </v-list-item-title>
              </strong>
            </v-list-item-content>
            <v-divider></v-divider>

            <div class="mt-4">
              <h2>Configuración</h2>
              <p>Puedes configurar los miembros de tu equipo aquí.</p>
            </div>
            <h4 class="caption">Opciones</h4>
            <div
              v-if="datosUser.rol=='Agente' || datosUser.rol=='Supervisor' || datosUser.rol=='Administrador'"
            >
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    v-model="datosUser.rol"
                    to="/settings/gestionarAccount"
                    rounded
                    block
                    height="3rem"
                    color="transparent"
                  >
                    <v-icon color="#25D366" class="mr-4">fas fa-user-cog</v-icon>Mi perfil
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <div v-if="datosUser.rol=='Supervisor' || datosUser.rol=='Administrador'">
              <v-row>
                <v-col class="text-center">
                  <v-btn to="/settings/General" rounded block height="3rem" color="transparent">
                    <v-icon color="green" class="mr-4">fas fa-comment-dots</v-icon>Mensajes automáticos
                  </v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="text-center">
                  <v-btn
                    to="/settings/gestionarAgentes"
                    rounded
                    block
                    height="3rem"
                    color="transparent"
                  >
                    <v-icon color="blue" class="mr-4">fas fa-user-friends</v-icon>Gestión de agentes
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>

        <v-col cols="12" sm="12" md="8">
          <div height="auto">
            <router-view></router-view>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<script>
// eslint-disable-next-line no-unused-vars
import { AmplifyEventBus } from "aws-amplify-vue";
import { components } from "aws-amplify-vue";

export default {
  Acomponents: {
    ...components
  },

  async beforeCreate() {
    let datos = await this.$Amplify.API.graphql(
      this.$Amplify.graphqlOperation(
        `
    query GetTblUser {
    getTblUser(idUser: "${localStorage.nombreUser}" ) {
      idUser
      departamento
      password
      permisos
      rol
      nombre
      apellido
    }
  }`
      )
    );
    this.datosUser = datos.data.getTblUser;
  },

  data() {
    return {
      datosUser: [],
      Drawer: true,
      signedIn: false,
      rol: localStorage.rol,
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

  // beforeRouteUpdate(to, from, next) {
  //   if (this.rol == "Supervisor") {
  //     next();
  //   } else {
  //     next({
  //       name: "Home"
  //     });
  //   }
  // }
};
</script>

<style>
.signout button {
  background: #00a9e0;
}
.bienvenido {
  -webkit-text-stroke: 0.5px #00a9e0;
  color: white;
  font-weight: bold;
}
</style>