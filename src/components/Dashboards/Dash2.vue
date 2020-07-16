<template>
  <v-card class="mx-auto text-center">
    <v-card-text>
      <v-sheet color="#fff">
        <v-sparkline
          :value="value"
          color="rgb(171, 47, 98)"
          height="110"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">{{ item.value }}</template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <div class="font-weight-thin">{{texto1}}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    value: [423, 446, 300, 510, 490, 610, 760],
    texto1: "Tendencia de Mensajes"
  })
};
</script>