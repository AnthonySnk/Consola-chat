<template>
  <div>
    <v-card>
      <v-card-title>Preferencia de los clientes</v-card-title>
      <v-card-subtitle align="start">en el uso de determinadas plataforma</v-card-subtitle>

      <pie-chart :data="[['Telegram', 44], ['Twitter', 23],['Messenger', 16],['WhatsApp', 2]]"></pie-chart>
    </v-card>
  </div>
</template>

