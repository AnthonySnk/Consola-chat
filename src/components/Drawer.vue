
<template>
  <v-app id="app">
    <div v-if="!signedIn">
      <amplify-authenticator></amplify-authenticator>
    </div>

    <div v-if="signedIn">
      <v-toolbar color="#00a9e0" dark>
        <v-app-bar-nav-icon @click="Drawer=!Drawer"></v-app-bar-nav-icon>
        <v-toolbar-title to="/">Movistar</v-toolbar-title>

        <v-spacer></v-spacer>
        <amplify-sign-out class="signout"></amplify-sign-out>
      </v-toolbar>

      <!-- aqui pondremos el drawer -->

      <v-navigation-drawer v-model="Drawer" color="#5BC500" dark app temporary>
        <v-list-item flat>
          <v-avatar size="60">
            <v-img src="https://randomuser.me/api/portraits/men/86.jpg"></v-img>
          </v-avatar>

          <v-list-item-content>
            <v-list-item-title dark>Bienvenido</v-list-item-title>
            <v-list-item-subtitle>{{datosUser.nombre}}</v-list-item-subtitle>
            <!-- ======================= -->
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <!-- ===================EJEMPLO USANDO GRAPHQL=========== -->

        <!-- <v-list-item-subtitle>{{datosUser.permisos}}</v-list-item-subtitle> -->
        <v-list dense nav>
          <div v-if="datosUser.permisos==('integraciones') != -1">
            <v-flex class="mt-4 mb-4"></v-flex>
            <v-list-item v-for="item in integraciones" :key="item.title" :to="item.link">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>

          <div v-if="datosUser.permisos==('dashboard') != -1">
            <v-flex class="mt-4 mb-4"></v-flex>
            <v-list-item v-for="item in dashboard" :key="item.title" :to="item.link">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item-title>{{ uesrnamerper }}</v-list-item-title> -->
          </div>

          <div v-if="datosUser.permisos==('configuraciones') != -1">
            <v-flex class="mt-4 mb-4"></v-flex>
            <v-list-item v-for="item in configuracion" :key="item.title" :to="item.link">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item-title>{{ uesrnamerper }}</v-list-item-title> -->
          </div>

          <div v-if="datosUser.permisos==('chats') != -1">
            <v-flex class="mt-4 mb-4"></v-flex>
            <v-list-item v-for="item in chats" :key="item.title" :to="item.link">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item-title>{{ uesrnamerper }}</v-list-item-title> -->
          </div>
        </v-list>

        <!-- ======================= -->
      </v-navigation-drawer>

      <!-- ------------------AQUI COMENZAREMOS A PONER LOS COMPONENTES--------------------- -->
      <!-- 
      <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
      </div>-->
      <router-view />
    </div>
  </v-app>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
import { components } from "aws-amplify-vue";
var nombreUser;

export default {
  components: {
    ...components
  },

  async beforeCreate() {
    try {
      // eslint-disable-next-line no-unused-vars
      const user = await Auth.currentAuthenticatedUser();
      const awsUser = await Auth.currentUserInfo();

      nombreUser = awsUser.username;
      this.email = awsUser.attributes.email;
      localStorage.email = awsUser.attributes.email;
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
        window.location = "/";
      } else {
        this.signedIn = false;
        nombreUser = "";
        window.location = "/";
        localStorage.clear();
      }
    });

    localStorage.setItem("nombreUser", nombreUser);
    let datos = await this.$Amplify.API.graphql(
      this.$Amplify.graphqlOperation(
        `
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
  }`
      )
    );
    this.datosUser = datos.data.getTblUser;
    localStorage.departamento = this.datosUser.departamento;
    localStorage.rol = this.datosUser.rol;
    localStorage.idUser = this.datosUser.idUser;
    localStorage.nombre = this.datosUser.nombre;
  },

  data() {
    return {
      datosUser: [],
      email: "",
      Drawer: true,
      signedIn: false,
      integraciones: [
        {
          title: "Integraciones",
          icon: "fas fa-archive",
          link: "/integraciones"
        }
      ],
      configuracion: [
        { title: "Configuración", icon: "fas fa-cog", link: "/settings" }
      ],
      dashboard: [
        { title: "Dashboard", icon: "fas fa-tachometer-alt", link: "/" }
      ],

      chats: [{ title: "Chats", icon: "mail", link: "/Chats" }],

      right: null
    };
  }
};
</script>

<style>
.signout button {
  background: #00a9e0;
}
.bienvenido {
  color: white;
}
</style>