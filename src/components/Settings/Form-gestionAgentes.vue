<template>
  
<amplify-connect :query="getTbl_user">
                  <template slot-scope="{loading,data,errors}">
                    <div v-if="loading">loading ...</div>
                    <div v-if="errors.lenght>0">errrors</div>
                    <div v-else-if="data">
                      <div
                        v-if=" data.getTblUser.rol=='Supervisor' || data.getTblUser.rol=='Administrador' "
                      >
                      
                      
                                 <v-container class="text-sm-left">
    <v-row no-gutters>
      <v-card-text>
        <v-card-title>
          <v-icon color="#0088cc" class="mr-4">fas fa-user-friends</v-icon>
          <h2>Agregar Agentes</h2>
        </v-card-title>

        <div>
          <p>Porfavor Ingresa los siguientes datos de los agentes</p>
        </div>
        <form >
          <div class="connect-form">
            <v-text-field
           
              v-model="nombre"
              :rules="nameRules2"
              label="*Nombre"
              required   
            ></v-text-field>
            <p></p>

          <v-text-field
              v-model="apellido"
              :rules="nameRules2"
              label="*Apellido" 
              required  
            ></v-text-field>
            <p></p>

              <!-- <v-text-field
              v-model="usuario"
              :rules="nameRules"
              :counter="10"
              label="Ingrese el Usuario"
              required
            ></v-text-field>
            <p></p> -->

         <v-text-field
              v-model="password"
               type="password"
              :rules="PasswordRules"
              :counter="10"
              label="*Ingrese la contraseña"
              required
            ></v-text-field>
            <p></p>

          <v-text-field
              v-model="password"
               type="password"
              :rules="PasswordRules"
              :counter="10"
              label="*Confirmar contraseña"
              required
            ></v-text-field>
            <p></p>

              <v-text-field
              v-model="email"
              :rules="emailRules"
              label="*Ingrese E-mail"
              required
            ></v-text-field>
               <p></p>

          <v-text-field
              v-model="dui"
              :rules="DuiRules"
              label="Ingrese su número de DUI"   
            ></v-text-field>
             <p></p>
          <v-text-field
              v-model="nit"
              :rules="NitRule"
              label="Ingrese su número de NIT"   
            ></v-text-field>
            <p></p>
           
           <v-text-field
              :rules="TellRules"
              v-model="telefono"
              label="Teléfono"   
            ></v-text-field>
            <p></p>

          <div class="field">
            <h2>Departamento:</h2>
            <div class="select">
              <select v-model="departamento">
                <option disabled value>Selecione una opción</option>
                <option>Soporte</option>
                <option>Desarrollo</option>
                <option>Ventas</option>
                <option>otros</option>
              </select>
            </div>
          </div>
          <p></p>

          <!-- <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Ingrese E-mail"
              required
            ></v-text-field>
            <p></p> -->

          <div class="field">
            <h2>Permisos:</h2>
            <v-checkbox v-model="dashboard" class="mx-1" label="Dashboard"></v-checkbox>
            <v-checkbox v-model="configuracion" class="mx-1" label="Configuración"></v-checkbox>
            <v-checkbox v-model="integraciones" class="mx-1" label="Integraciones"></v-checkbox>
          </div>
          <p></p>

          <div class="field">
            <label class="label">Rol</label>
            <div class="select">
              <select v-model="rol">
                <option disabled value></option>
                <option>Agente</option>
                <option>Supervisor</option>
                <option>Administrador</option>
              </select>
            </div>
          </div>
          <p></p>

          <div class="text-center">
            <br />
            <v-btn dark rounded height="3rem" width="200px" color="#00A9E0
                  "  onclick="alert('¡Usuario Agregado con Exito!')"   @click="submit">Guardar</v-btn>
          </div>

          <amplify-connect :query="nuevoUser">
            <template slot-scope="{loading,data,errors}">
              <div v-if="loading">loading ...</div>
              <div v-if="errors.lenght>0">errors</div>
              <div v-else-if="data"></div>
              <!-- <h2>{{data}}</h2> -->
            </template>
          </amplify-connect>
       </div>
        </form>
      </v-card-text>
    </v-row>
  </v-container>


                           

                         

                      </div>

                      

                      <div
                        v-if="data.getTblUser.rol=='Agente' "
                      >
                        <v-row>
                          <v-col class="text-center">
                            <v-btn
                              to="/"
                              rounded
                              block
                              height="3rem"
                              width="400px"
                              color="transparent"
                            >
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
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
// import { components } from "aws-amplify-vue";
import { cognitoidentityserviceprovider } from "aws-amplify-vue";

var nombreUser;

export default {
  data: () => ({
    nombre: "",
    apellido: "",
    dui: "",
    nit: "",
    idUser: "",
    password: "",
    telefono: "",
    departamento: "",
    email: "",
    permisos: [],
    rol: "",
    valid: false,
    nameRules: [
      v => !!v || "Nombre de Usuario requerido",
      v => v.length <= 10 || "Tiene que tener 10 caracteres"
    ],

    nameRules2: [
      v => !!v || "Nombre y Apellido requerido",
      v => /^[A-Za-z ]+$/.test(v) || "Ingrese solo letras"
    ],
    emailRules: [
      v => !!v || "E-mail es requido",
      v => /.+@.+/.test(v) || "E-mail Invalido"
    ],
    PasswordRules: [v => !!v || "Debe ingresar contraseña"],
    TellRules: [v => /^\d{8}$/.test(v) || "El numero debe contener 8 digitos"],
    DuiRules: [
      v => /^\d{9}$/.test(v) || "El Numero de Dui debe contener 9 digitos"
    ],
    NitRules: [
      v => /^\d{15}$/.test(v) || "El Numero de Nit debe contener 15 digitos"
    ]
  }),

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
    userPanel() {
      return nombreUser;
    }
  },
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
        //location.reload();
      } else {
        this.signedIn = false;
        //nombreUser = "";
      }
    });
    return nombreUser;
  },

  methods: {
    submit() {
      // eslint-disable-next-line no-unused-vars
      var jsonData2 = {
        nombre: this.nombre,
        apellido: this.apellido,
        dui: this.dui,
        nit: this.nit,
        idUser: this.usuario,
        password: this.email,
        telefono: this.telefono,
        departamento: this.departamento,
        correo: this.email,
        permisos: [],
        rol: this.rol
      };
      if (this.dashboard) this.permisos.push("dashboard");
      if (this.configuracion) this.permisos.push("configuraciones");
      if (this.integraciones) this.permisos.push("integraciones");
      console.log(this.permisos);
      console.log(jsonData2);
      // this.cognito();
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(`mutation CreateTblUser {
    createTblUser(input: {idUser:"${this.email}",nombre:"${this.nombre}",apellido:"${this.apellido}",dui:"${this.dui}",nit:"${this.nit}",password:"${this.password}",telefono:"${this.telefono}",departamento:"${this.departamento}",correo:"${this.email}",permisos:"${this.permisos}",rol:"${this.rol}"}) {
idUser
    }
  }
  `)
      );
      // ).then(res => {
      //   this.todos = res.data.listTodos.items;
      //   this.logger.info(`Todos successfully listed`, res);
      //   console.log(res);
      // });
    },
    cognito() {
      var params = {
        ClientId: "6a6dlnlovth8lpgkvdbakvd8rg" /* required */,
        Password: this.password /* required */,
        Username: this.usuario /* required */,
        // AnalyticsMetadata: {
        //   AnalyticsEndpointId: 'STRING_VALUE'
        // },
        // ClientMetadata: {
        //   '<StringType>': 'STRING_VALUE',
        //   /* '<StringType>': ... */
        // },
        // SecretHash: 'STRING_VALUE',
        UserAttributes: [
          {
            Name: "email" /* required */,
            Value: this.email
          },
          {
            Name: "nombre" /* required */,
            Value: this.nombre
          },
          {
            Name: "custom:permisos" /* required */,
            Value: this.jsonData2.permisos
          }
          /* more items */
        ],
        // UserContextData: {
        //   EncodedData: 'STRING_VALUE'
        // },
        ValidationData: [
          {
            Name: "custom:nombre" /* required */,
            Value: this.nombre
          }
          /* more items */
        ]
      };

      cognitoidentityserviceprovider.signUp(params, function(err, data) {
        if (err) console.log(err, err.stack);
        // an error occurred
        else console.log(data); // successful response
      });
    }
  }
};
</script>




<style>
.connect-form h2 {
  color: #00a9e0;
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