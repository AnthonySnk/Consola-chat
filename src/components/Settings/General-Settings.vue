<template>
  <amplify-connect :query="getTbl_user">
    <template slot-scope="{loading,data,errors}">
      <div v-if="loading">loading ...</div>
      <div v-if="errors.lenght>0">errrors</div>
      <div v-else-if="data">
        <div v-if=" data.getTblUser.rol=='Supervisor' || data.getTblUser.rol=='Administrador' ">
          <v-container class="text-sm-left pa-8">
            <v-row no-gutters>
              <v-card-title>
                <h2>Mensajes automáticos</h2>
              </v-card-title>

              <div>
                <p>Puedes configurar mensajes programados para interactuar con el cliente de forma automática en esta sección.</p>
              </div>
              <div class="connect-form">
                <h2>Auto Responder</h2>
                <p
                  class="detail-info"
                >Esta opción permite establecer los mensajes que recibirá el cliente de forma automática en los eventos definidos por el usuario en horario laboral como fuera de la hora de oficina.</p>
                <label>Mensaje de Bienvenida a los usuarios</label>
                <p></p>
                <p
                  class="detail-info"
                >Por favor ingresa el mensaje de Bienvenida que deseas agregar.</p>
                <textarea
                  v-model="msjBienvenida"
                  name="when-online"
                  placeholder="Su mensaje de Bienvenido automática"
                  rows="3"
                  class="form-control"
                ></textarea>

                <label>Auto Responder fuera de la hora de oficina</label>
                <v-switch v-model="dense" label="Activar"></v-switch>
                <p></p>
                <p
                  class="detail-info"
                >Los mensajes solo se envían una vez al principio de cada conversación fuera de la hora de la oficina.</p>
                <textarea
                  v-model="msjOffline"
                  name="when-online"
                  placeholder="Su respuesta automática cuando este fuera de linea"
                  rows="3"
                  class="form-control"
                ></textarea>
                <br />
                <div>
                  <p></p>

                  <h2>Selecciona el horario:</h2>
                  <v-row justify="space-around" align="center">
                    <v-col style="width: 290px;  flex: 0 1 auto;">
                      <h2>Inicio:</h2>
                      <v-time-picker v-model="start" :max="end"></v-time-picker>
                    </v-col>
                    <v-col style="width: 290px; flex: 0 1 auto;">
                      <h2>Fin:</h2>
                      <v-time-picker v-model="end" :min="start"></v-time-picker>
                    </v-col>
                  </v-row>
                </div>
                <!-- <div>
            <p></p>
            <h2>Selecciona la fecha:</h2>
            <v-row align="center">
              <v-date-picker
                v-model="date"
                full-width
                :landscape="$vuetify.breakpoint.smAndUp"
                class="mt-4"
              ></v-date-picker>
            </v-row>
                </div>-->
                <p></p>

                <div class="text-center">
                  <br />
                  <v-btn
                    dark
                    rounded
                    height="3rem"
                    width="200px"
                    color="#00A9E0
"
                    onclick="alert('¡Mensajes Guardados!')"
                    @click="submit"
                  >Guardar</v-btn>
                </div>
              </div>
            </v-row>
          </v-container>
        </div>

        <div v-if="data.getTblUser.rol=='Agente' ">
          <v-row>
            <v-col class="text-center">
              <v-btn to="/" rounded block height="3rem" width="400px" color="transparent">
                <v-icon color="green" class="mr-4">arrow_back</v-icon>Regresar
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </template>
  </amplify-connect>
</template>



<script>
// eslint-disable-next-line no-unused-vars
var jsonData2;
var nombreUser;
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";

export default {
  data: () => ({
    objectId: "",
    tipoObjeto: parseInt("9990001"),
    fecha: "",
    msjBienvenida: "",
    msjOffline: "",
    horaIni: "",
    horaFin: ""
  }),
  async beforeCreate() {
    try {
      // eslint-disable-next-line no-unused-vars
      const user = await Auth.currentAuthenticatedUser();
      const awsUser = await Auth.currentUserInfo();

      nombreUser = awsUser.username;
      console.log(nombreUser);
      this.signedIn = true;
    } catch (err) {
      this.signedIn = false;
      //nombreUser = "";
    }
    AmplifyEventBus.$on("authState", info => {
      if (info === "signedIn") {
        this.signedIn = true;
        location.reload();
      } else {
        this.signedIn = false;
        //nombreUser = "";
      }
    });
    return nombreUser;
  },

  computed: {
    getTbl_user() {
      return this.$Amplify.graphqlOperation(`
query GetTblUser {
    getTblUser(idUser: "${nombreUser}" ) {
      idUser
      departamento
      password
      permisos
      rol
      nombre
      apellido
    }
  }`);
    },
    userpanel() {
      return nombreUser;
    }
  },

  methods: {
    cambiarIcon() {
      if (this.icon == "fas fa-toggle-off") {
        this.icon = "fas fa-toggle-on";
        this.color = "#5BC500";
      } else (this.icon = "fas fa-toggle-off"), (this.color = "grey");
    },

    eliminar() {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(`  
        mutation borrar {
    deleteTblStorage(input:{objectId:"${this.userpanel}",tipoObjeto:99900202}){
       objectId
    }
  }`)
      );
    },

    submit() {
      fech = new Date();
      var jsonData2 = {
        msjBienvenida: this.msjBienvenida,
        msjOffline: this.msjOffline,
        horaIni: this.horaIni,
        horaFin: this.horaFin,
        idUser: this.userpanel
      };
      this.eliminar();
      let fech = new Date();
      console.log(jsonData2);
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(`  
        mutation Create {
    createTblStorage(input:{objectId:"${
      this.userpanel
    }",tipoObjeto:99900202,msjBienvenida:"${this.msjBienvenida}",msjOffline:"${
          this.msjOffline
        }",horaIni:"${this.start}",horaFin:"${
          this.end
        }",fecha:"${fech.toISOString()}"}){
       objectId
    }
  }`)
      );
    }
  }
};
</script>


<style>
.connect-form h2 {
  color: #5bc500;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
}
input[readonly] {
  background: #f2f2f2;
}
form label {
  font-size: 14px;
  line-height: 28px;
}
input,
select,
textarea {
  font-family: "Inter", sans-serif;
  font-weight: normal;
  width: 100%;
  color: #8c8c8c;
  padding: 10px 14px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 7px 17px rgba(51, 51, 51, 0.07);
  box-shadow: 0px 7px 17px rgba(51, 51, 51, 0.07);
  border-radius: 6px;
  border: 1px solid transparent;
  outline: none;
  font-size: 14px;
  line-height: 16px;
}
p.detail-info {
  font-size: 13px;
  color: #39393a;
  margin-bottom: 18px;
  border-left: 3px solid #c4c4c4;
  padding-left: 12px;
}
</style>