<template>
  <div>
    <v-card>
      <v-card-title>Problemas resportados</v-card-title>
      <v-card-subtitle align="start">Mes actual</v-card-subtitle>
      <area-chart :data="{'2017-01-01': 11, '2017-01-02': 6}"></area-chart>
    </v-card>
  </div>
</template>