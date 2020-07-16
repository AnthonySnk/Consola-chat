<template>
  <div>
    <v-card>
      <v-card-title>Cronologia de aunmento de</v-card-title>
      <v-card-subtitle align="start">carga de chat en este año</v-card-subtitle>

      <line-chart
        :colors="['#b00', '#666']"
        :data="{'2019-01-01': 4, '2019-03-06': 6,'2019-05-10':11}"
      ></line-chart>
    </v-card>
  </div>
</template>
