<template>
  <v-app>
    <v-container class="text-sm-left">
      <v-row no-gutters>
        <v-card-text>
          <v-card-title>
            <v-icon color="#1da1f2" class="mr-4">fab fa-twitter</v-icon>
            <h2>Integración Twitter</h2>
          </v-card-title>

          <p>Para conectar sigue los siguientes pasos</p>
            


          <v-row>
            <v-col class="text-center">
               <v-btn
                      to="" 
                      rounded
                      block
                      height="3rem"
                      width="400px"
                      color="transparent"
                    >
                      <v-icon color="#1da1f2" class="mr-4">fab fa-twitter</v-icon>Conectate con Twitter
                    </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
              <v-btn to rounded dark block height="3rem" width="400px" color="#00A9E0">
                <v-icon color="red" class="mr-4"></v-icon>DESCONECTAR
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.cssbton {
  border: 1px solid #5bc500;
}

h4.caption {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  color: #5bc500;
  line-height: 19px;
  -webkit-box-align: left;
  -ms-flex-align: left;
  align-items: left;
  -webkit-box-pack: left;
  -ms-flex-pack: left;
  justify-content: left;
  display: block;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  line-height: 1.4;
}
h2 {
  display: block;

  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
h3 {
  display: block;

  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>