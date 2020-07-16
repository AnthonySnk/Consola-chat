<template>
  <v-card style="max-width: 600">
    <v-row justify="space-between">
      <v-col cols>
        <v-card-title primary-title>
          <div>
            <div>Calidad de Asistencia segund los clientes</div>
            <div>en la plataforma Twitter</div>
          </div>
        </v-card-title>
      </v-col>
      <v-img
        contain
        height="90px"
        src="https://lh3.googleusercontent.com/J8k5q78xv4R8Smi4vOE6iUphLvOz0efC-0lzoyGfd0KRUlAv4ekuCtlss6KBN-tMvEw"
        style="flex-basis: 450px"
      ></v-img>
    </v-row>
    <v-divider dark></v-divider>
    <v-card-actions class="pa-2">
      <span class="dark--text text--lighten-2 caption mr-2 aling='center's">({{ rating }})</span>
      <v-rating
        v-model="rating"
        background-color="white"
        color="yellow accent-2"
        dense
        half-increments
        hover
        size="18"
      ></v-rating>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    rating: 4.3
  })
};
</script>