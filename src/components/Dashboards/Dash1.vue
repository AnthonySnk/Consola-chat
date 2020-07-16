<template>
  <v-card max-width="auto">
    <v-card-title>{{titulo}}</v-card-title>
    <v-card-subtitle align="start">{{subtitulo}}</v-card-subtitle>
    <v-sparkline
      :value="value"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
    ></v-sparkline>
    <v-divider></v-divider>
    <v-card-text>{{texto1}}</v-card-text>
  </v-card>
</template>


<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  data: () => ({
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
    titulo: "Estes es el titulo del dashboard",
    subtitulo: "Este es el subtitulo del dasboard",
    texto1: "Soy una especie de descripcion"
  })
};
</script>

<style scoped>
.v-sheet--offset {
  top: 100px;
  margin: 800px;
}
</style>