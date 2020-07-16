<template>
  <v-container class="text-sm-left">
    <v-row no-gutters>
      <v-card-text>
        <v-card-title>
          <v-icon color="#0088cc" class="mr-4">fab fa-telegram</v-icon>
          <h2>Integración Telegram</h2>
        </v-card-title>

        <div class="mt-4">
          <p>Puede agregar una cuenta de Telegram</p>
        </div>

        <br />

        <v-row>
          <v-col cols="auto">
            <center>
              <v-img height="70" width="70" src="https://i.ibb.co/bXbpkJD/66.jpg"></v-img>
            </center>
            <v-btn
              to="/integraciones/componente2"
              style="background-color: transparent"
              text
              large
              small
            >Agregar Cuenta</v-btn>
          </v-col>
          <div v-for="(item,index) in dataDATA" :key="item">
            <v-col cols="auto">
              <center>
                <v-img
                  height="70"
                  width="70"
                  src="https://pngimg.com/uploads/telegram/telegram_PNG34.png"
                ></v-img>
                <br />
                <h4 text-center>{{item.substring(0,7)}}</h4>
              </center>
              <!-- <v-btn
                to="/integraciones/componente2"
                style="background-color: transparent"
                text
                large
              >{{item.substring(0,7)}}</v-btn>-->

              <v-btn
                @click="DesconectarBOT(index)"
                style="background-color: transparent"
                text
                large
                onclick="alert('Datos Eliminados exitosamente');  location.reload(); "
                color="error"
              >Desconectar</v-btn>
            </v-col>
          </div>
        </v-row>
      </v-card-text>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dataDATA: []
    };
  },
  methods: {
    DesconectarBOT(index) {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(`mutation borrarBOT{
       deleteTblStorage(input:{objectId:"${this.dataDATA[index]}",tipoObjeto:1212}){
       objectId
    }
  }`)
      );
    }
  },

  async beforeCreate() {
    let datos = await this.$Amplify.API.graphql(
      this.$Amplify.graphqlOperation(
        `query Cuentas{
  listTblStorages(filter:{cuenta:{contains:"${localStorage.nombreUser}"}}){
    items{objectId}
  }
  }
`
      )
    );
    for (const iterator of datos.data.listTblStorages.items) {
      // let nombreCorto = iterator.objectId.substring(0, 7);
      // let arrayPus = [
      //   { objectId: iterator.objectId, nombreCorto: nombreCorto }
      // ];
      this.dataDATA.push(iterator.objectId);
    }
  }
};
</script>




// .then(response => {
//           this.info = response.data;
//           console.log(this.info);
//         })
//     );














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
  font-weight: normal;
}
h3 {
  display: block;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>