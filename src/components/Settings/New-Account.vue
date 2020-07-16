<template>
  <v-container class="text-sm-left">
    <v-row no-gutters>
      <v-card-text>
        <v-card-title>
          <v-icon color="#25D366" class="mr-4">fab fa-whatsapp</v-icon>
            <h2>Integración WhatsApp</h2>
        </v-card-title>

        <div class="mt-4">
          <p>Puede crear  y eliminar una nueva cuenta de WhatsApp</p>
        </div>
        
        <div align=left>
          
          <v-card class="d-inline-block">
    <v-container >
      <v-row justify="space-between">
        <v-col cols="auto">
          <center>
          <v-img  
            height="70"
            width="70"
            src="https://i.ibb.co/bXbpkJD/66.jpg"
             
          ></v-img>
         
          </center>
         <v-btn 
                  
                              to="/integraciones/componente3"
                              style="background-color: transparent"
                              
                              
                              
                            >
                              <h3>Agregar Cuenta</h3> 
                            </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  
        </div>
      </v-card-text>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Nombre Cuenta",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Token", value: "Token" },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    Option: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      Token: ""
      
    },
    defaultItem: {
      name: "",
      Token: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Template" : "Editar Agente";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.Option = [
        {
          name: "Cuenta de prueba",
          Token: "Datos de prueba"
         
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.Option.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.Option.indexOf(item);
      confirm("Estas seguro que deseas eliminar la cuenta?") &&
        this.Option.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.Option[this.editedIndex], this.editedItem);
      } else {
        this.Option.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>



















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