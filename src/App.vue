<template>
  <div id="app">
    <v-app>
      <drawer></drawer>
      <v-content class="ma-4"></v-content>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import Drawer from "./components/Drawer.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: { Footer, Drawer }
};
</script>

<style>
.login {
  font-family: "Inter var", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  padding: 0px 0px 0px;
  margin-top: 60px;
  width: 100%;
}
.signout {
  /* background-color: #ededed; */
  margin-top: 0px;
  padding: 11px 0px 1px;
  float: right;
}
#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  justify-content: center;
  display: flex;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.scroll {
  overflow-y: auto;
}

/* Tamaño del scroll */
.scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Estilos barra (thumb) de scroll */
.scroll::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.scroll::-webkit-scrollbar-thumb:active {
  background-color: #999999;
}

.scroll::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

/* Estilos track de scroll */
.scroll::-webkit-scrollbar-track {
  background: #e1e1e1;
  border-radius: 4px;
}

.scroll::-webkit-scrollbar-track:hover,
.scroll::-webkit-scrollbar-track:active {
  background: #d4d4d4;
}

@import url("https://rsms.me/inter/inter.css");
html {
  font-family: "Inter", sans-serif;
}
@supports (font-variation-settings: normal) {
  html,
  body {
    font-family: "Inter var", sans-serif;
    width: 100%;
    height: 100%;
    color: #555555;
  }
}
</style>
