
<template>
  <v-app>
    <!-- =============Variable de usuario========== -->

    <v-container class="text-sm-left">
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <div height="auto">
            <div>
              <!-- =========================================================== -->
              <v-list-item-content>
                <strong>
                  <v-list-item-title>
                    <h2>Hola, {{ nombre}}</h2>
                  </v-list-item-title>
                </strong>
              </v-list-item-content>
              <v-divider></v-divider>

              <div class="mt-4">
                <h2>Integraciones</h2>
                <p>Haz click en el canal que deseas configurar para integrarlo a la consola multicanal de forma rápida y fácil.</p>
              </div>

              <v-row>
                <v-col class="text-center">
                  <v-btn
                    to="/integraciones/componente2"
                    rounded
                    block
                    height="3rem"
                    color="transparent"
                  >
                    <v-icon color="#0088cc" class="mr-4">fab fa-telegram</v-icon>Telegram
                  </v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="text-center">
                  <v-btn
                    to="/integraciones/componente3"
                    rounded
                    block
                    height="3rem"
                    color="transparent"
                  >
                    <v-icon color="#25D366" class="mr-4">fab fa-whatsapp</v-icon>WhatsApp
                  </v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="text-center">
                  <v-btn
                    to="/integraciones/componente4"
                    rounded
                    block
                    height="3rem"
                    color="transparent"
                  >
                    <v-icon color="#0078FF" class="mr-4">fab fa-facebook-messenger</v-icon>FB Messenger
                  </v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="text-center">
                  <v-btn
                    to="/integraciones/componente5"
                    rounded
                    block
                    height="3rem"
                    color="transparent"
                  >
                    <v-icon color="#1da1f2" class="mr-4">fab fa-twitter</v-icon>Twitter
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>

        <v-col cols="12" sm="12" md="8">
          <div class="scroll" height="auto">
            <router-view></router-view>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<script>
// eslint-disable-next-line no-unused-vars

export default {
  data() {
    return {
      nombre: localStorage.nombre,
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

<style>
.signout button {
  background: #00a9e0;
}
.bienvenido {
  -webkit-text-stroke: 0.5px #00a9e0;
  color: transparent;
  font-weight: bold;
}
</style>