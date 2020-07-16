<template>
  <v-content>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12" sm="12" md="4">
          <v-card outlined tile>
            <Dash1></Dash1>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-card outlined tile>
            <Dash2></Dash2>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-card outlined tile>
            <Dash1></Dash1>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-card outlined tile>
            <Dash4></Dash4>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-card outlined tile>
            <Dash5></Dash5>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-card outlined tile>
            <Dash6></Dash6>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-card outlined tile>
            <Dash7></Dash7>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>


<script>
import Dash1 from "../components/Dashboards/Dash1.vue";
import Dash2 from "../components/Dashboards/Dash2.vue";
// import Dash3 from "../components/Dash3.vue";
import Dash4 from "../components/Dashboards/Dash4.vue";
import Dash5 from "../components/Dashboards/Dash5.vue";
import Dash6 from "../components/Dashboards/Dash6.vue";
import Dash7 from "../components/Dashboards/Dash7.vue";

// import GetTblUser from "../graphql/queries";

export default {
  name: "app",
  components: {
    Dash1,
    Dash2,
    Dash4,
    Dash5,
    Dash6,
    Dash7
  }
  // apollo: {
  //   simpleMovingAverageAnalytic: {
  //     query: GetTblUser,
  //     variables: {
  //       idUser: "980362344"
  //     }
  //   }
  // }
};
</script>