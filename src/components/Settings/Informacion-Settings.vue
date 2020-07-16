<template>
  <v-app>
    <v-container class="text-sm-left pa-8">
      <v-row no-gutters>
        <v-card-title>
          <h2>Mi información</h2>
        </v-card-title>
        <div>
          <p>Aquí tienes un resumen de la información más relevante de tu usuario.</p>
        </div>
        <div class="connect-form">
          <h2>Detalles del Usuario</h2>
          <h2></h2>
          <label>
            ID Usuario
            <!-- <h2>{{data.getTblUser.idUser}}</h2> -->
            <input type="text" v-model="idUserInfo" readonly :placeholder="idAgente" />
          </label>
          <!-- <p>You need to register in Qiscus SDK</p> -->
          <!-- <h2>Canal</h2> -->
          <h2></h2>
          <label>
            Rol
            <!-- <h2>{{userpanel}}</h2> -->
            <input type="text" v-model="rolInfo" readonly :placeholder="appid" />
          </label>
          <h2></h2>
          <label>
            Departamento
            <h2></h2>
            <input type="text" v-model="departamentoInfo" readonly :placeholder="secretKey" />
          </label>
        </div>
      </v-row>
    </v-container>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      rolInfo: localStorage.rol,
      departamentoInfo:
        localStorage.departamento != null
          ? "General"
          : localStorage.departamento,
      idUserInfo: localStorage.idUser
    };
  }
};
</script>
<style>
.connect-form h2 {
  color: #23b098;
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
</style>