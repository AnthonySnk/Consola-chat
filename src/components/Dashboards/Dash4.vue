

<template>
  <div>
    <v-card>
      <v-card-title>Días más concurridos</v-card-title>
      <v-card-subtitle align="start">Plataforma en general</v-card-subtitle>

      <column-chart :data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]"></column-chart>
    </v-card>
  </div>
</template>