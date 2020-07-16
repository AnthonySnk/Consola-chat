<template>
  <v-app>
    <center>

    <div class="login-box">
      <form>
        <div class="form-group has-feedback">
          <input name ="usuario" type="email" class="form-control" placeholder="Usuario" />
          <!-- <span class=""></span>  -->
        </div>
        <div class="form-group has-feedback">
          <input name="password"  type="password" class="form-control" placeholder="Contraseña" />
          <!-- <span class=""></span> -->
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" /> Recordar sesión
          </label>
        </div>
        <div class="form-group">
          <!-- Ruta a mandar -->
           <v-btn to = '../views/Home' rounded dark block height="3rem" width="400px" color="#00A9E0">
                <v-icon color="red" class="mr-4"></v-icon>Iniciar Sesión
              </v-btn>
        </div>
         <div class="form-group">
           <v-btn to = '../views/Home.vue' rounded dark block height="3rem" width="400px" color="#00A9E0">
                <v-icon color="red" class="mr-4"></v-icon>Registrate
              </v-btn>
        </div>

      </form>
    </div>
 
    </center>
  
  </v-app>
</template>







<style>
.login-box {
  width: 400px;
  height: 7% auto;
  background-color: white;
  color: black;
  padding: 20px;
  border-top: 0;
}
.form-group {
  width: 100%;
  background-color: rgb(233, 233, 233);
  color: #000;
  border-color: rgb(207, 207, 207);
  border-radius: 5px;
  margin-bottom: 25px;
}

.btn.btn-primary {
  background-color: rgb(0, 68, 255);
  color: white;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
}
.btn-block {
  display: block;
}
</style>