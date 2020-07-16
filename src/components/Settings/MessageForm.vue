
<template>
  <amplify-connect :query="historialSMS">
    <template slot-scope="{loading,data,errors}">
      <div v-if="loading">loading ...</div>
      <div v-if="errors.lenght>0">errrors</div>
      <div vif="data">
        <v-list two-line>
          <template v-for="(item) in data.queryTblStoragesByTipoObjetoFechaIndex.items">
            <!-- <v-subheader
                                  v-if="item.fecha=='ahora'&&"
                                  :key="item.fecha"
                                  inset
            >{{ item.fecha }}</v-subheader>-->

            <!-- <v-divider v-if="item.divider" :key="item.divider" inset></v-divider> -->

            <v-list-item v-if="item" :key="item.objectId" ripple>
              <v-list-item-avatar>
                <img :src="item.avatar" />
              </v-list-item-avatar>
              <div class="chat-container" align="left">
                <v-list-item-content>
                  <v-list-item-title v-html="item.objectId"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.contenido"></v-list-item-subtitle>
                </v-list-item-content>
              </div>
            </v-list-item>
          </template>
        </v-list>
      </div>

      <div class="chat-form-container">
        <form id="chat-form">
          <input id="msg" type="text" placeholder="Ingrese el mensaje" required autocomplete="off" />
          <button class="btn">
            <i class="fas fa-paper-plane"></i> Enviar
          </button>
        </form>
      </div>
    </template>
  </amplify-connect>
</template>


<script>
// eslint-disable-next-line no-unused-vars
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
import { components } from "aws-amplify-vue";
var nombreUser;

export default {
  Acomponents: {
    ...components
  },

  computed: {
    historialSMS() {
      return this.$Amplify.graphqlOperation(`
query historialSMS {
    queryTblStoragesByTipoObjetoFechaIndex(
     tipoObjeto:1
    ) {
      items {
      	objectId,
        tipoObjeto,
        sender
        origen
        tipo
        contenido
        fecha
        avatar
        divider
      }
      
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

  data() {
    return {
      items: [
        {
          header: "Ahora"
        },
        { divider: true },
        {
          avatar: "https://picsum.photos/250/300?image=660",
          title: "Meeting @ Noon",
          subtitle:
            "<span class='font-weight-bold'>Spike Lee</span> &mdash; I'll be in your neighborhood"
        },
        {
          avatar: "https://picsum.photos/250/300?image=821",
          title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
          subtitle:
            "<span class='font-weight-bold'>to Operations support</span> &mdash; Wish I could come."
        },
        {
          avatar: "https://picsum.photos/250/300?image=783",
          title: "Yes yes",
          subtitle:
            "<span class='font-weight-bold'>Bella</span> &mdash; Do you have Paris recommendations"
        },
        {
          header: "Ayer"
        },
        { divider: true },
        {
          avatar: "https://picsum.photos/250/300?image=1006",
          title: "Dinner tonight?",
          subtitle:
            "<span class='font-weight-bold'>LaToya</span> &mdash; Do you want to hang out?"
        },
        {
          avatar: "https://picsum.photos/250/300?image=146",
          title: "So long",
          subtitle:
            "<span class='font-weight-bold'>Nancy</span> &mdash; Do you see what time it is?"
        },
        {
          header: "La semana Pasada"
        },
        { divider: true },
        {
          avatar: "https://picsum.photos/250/300?image=1008",
          title: "Breakfast?",
          subtitle:
            "<span class='font-weight-bold'>LaToya</span> &mdash; Do you want to hang out?"
        },
        {
          avatar: "https://picsum.photos/250/300?image=839",
          title:
            'Winter Porridge <span class="grey--text text--lighten-1"></span>',
          subtitle:
            "<span class='font-weight-bold'>cc: Daniel</span> &mdash; Tell me more..."
        },
        {
          avatar: "https://picsum.photos/250/300?image=145",
          title: "Oui oui",
          subtitle:
            "<span class='font-weight-bold'>Nancy</span> &mdash; Do you see what time it is?"
        }
      ],
      Drawer: true,
      signedIn: false,
      rol: "Agente",
      Integraciones: [
        {
          title: "Integraciones",
          icon: "fas fa-archive",
          link: "/integraciones"
        }
      ],
      Configuracion: [
        { title: "Configuración", icon: "fas fa-cog", link: "/settings" }
      ],
      Dashboard: [
        { title: "Dashboard", icon: "fas fa-tachometer-alt", link: "/" }
      ],

      right: null
    };
  }

  // rutas para componentes
  // beforeRouteUpdate(to, from, next) {
  //   if (this.rol == "Supervisor") {
  //     next();
  //   } else {
  //     next({
  //       name: "Home"
  //     });
  //   }
  // }
};
</script>


<style scoped>
.chat-messages {
  padding: 30px;
  max-height: 500px;
  overflow-y: scroll;
}
.chat-messages .message {
  padding: 10px;
  margin-bottom: 15px;
  background-color: var(--light-color);
  border-radius: 5px;
}

.chat-messages .message .meta {
  font-size: 15px;
  font-weight: bold;
  color: var(#00a9e0);
  opacity: 0.7;
  margin-bottom: 7px;
}

.chat-messages .message .meta span {
  color: #50535a;
}

.chat-form-container {
  padding: 105px 7px;
  background-color: var(--dark-color-a);
  color: #50535a;
}

.chat-form-container form {
  display: flex;
}

.chat-form-container input[type="text"] {
  font-size: 16px;
  padding: 5px;
  height: 50px;
  flex: 1;
  color: #50535a;
}

.message {
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: lightskyblue;
}
.chat-container .username {
  font-size: 18px;
  font-weight: bold;
}

.chat-container {
  padding: 8px;
  background-color: lightgreen;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  max-width: 50%;
  word-wrap: break-word;
}
</style>