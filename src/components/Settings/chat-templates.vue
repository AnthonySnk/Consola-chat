<template>
  <v-container class="text-sm-left">
    <v-row no-gutters>
      <v-card-text>
        <v-card-title>
          <v-icon color="green" class="mr-4">fas fa-comment-dots</v-icon>
          <h2>Chat Templates</h2>
        </v-card-title>

        <div class="mt-4">
          <p>Puedes, crear y editar Chat Templates.</p>
        </div>
        <div id="app">
          <v-app id="inspire">
            <v-data-table :headers="headers" :items="Option" class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="#5BC500" dark class="mb-2" v-on="on">Agregar Nuevo Template</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Comando"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.ContTemplate"
                                label="Contenido del Template"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
          </v-app>
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
        text: "Comando",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Contenido del Template", value: "ContTemplate" },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    Option: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      ContTemplate: 0
    },
    defaultItem: {
      name: "",
      ContTemplate: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Template" : "Editar Template";
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
          name: "Mensaje pueba",
          ContTemplate: 6
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
      confirm("Estas seguro que deseas eliminar el template?") &&
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