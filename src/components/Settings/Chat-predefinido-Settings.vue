<template>
  <v-app>
    <v-container class="text-sm-left pa-8">
      <v-row no-gutters>
        <v-card-title>
          <h2>Mensajes Predefinidos</h2>
          <v-btn pa-10 tile large icon @click="cambiarIconChat">
            <v-icon :color="color">{{icon}}</v-icon>
          </v-btn>
        </v-card-title>
        <p>Active o desactive el mensaje predefinido (se requiere una URL de API si habilita esta característica)</p>

        <label class="admin">
          <font>API URL</font>
          <input type="text" id="predifine-api-url" placeholder="La URL de la API aquí" />
        </label>
      </v-row>
    </v-container>

    <div class="text-center">
      <v-btn dark rounded height="3rem" width="200px" color="#5BC500">Guardar</v-btn>
    </div>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      icon: "fas fa-toggle-off",
      color: "grey"
    };
  },
  methods: {
    cambiarIconChat() {
      if (this.icon == "fas fa-toggle-off") {
        this.icon = "fas fa-toggle-on";
        this.color = "#5BC500";
      } else (this.icon = "fas fa-toggle-off"), (this.color = "grey");
    }
  }
};
</script>

