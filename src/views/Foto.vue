<template>
  <v-app>
    <h1>Galeria de Fotos</h1>
    <v-btn @click="home">home</v-btn>
    <router-link :to="{name:'fotos',params:{id:item}}" v-for="item in fotosArreglos" :key="item">
      <v-btn>Foto {{item}}</v-btn>
    </router-link>

    <Foto></Foto>
  </v-app>
</template>


<script>
import Foto from "../components/Fotografias.vue";
export default {
  components: {
    Foto
  },
  data() {
    return {
      fotosArreglos: [1, 2, 3]
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    }
  }
};
</script>