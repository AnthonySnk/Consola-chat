import Vue from 'vue'
import VueRouter from 'vue-router'
import Informacion from '../components/Settings/Informacion-Settings.vue'
import Telegram from '../components/Settings/telegram-Setting.vue'
import Whatsaap from '../components/Settings/Whatsaap-Settings.vue'
import Facebook from '../components/Settings/Facebook-Settings.vue'
import Twitter from '../components/Settings/Twitter-Settings.vue'
import General from '../components/Settings/General-Settings.vue'
import Chatpredefinido from '../components/Settings/Chat-predefinido-Settings.vue'
import ChatTemplate from '../components/Settings/chat-templates.vue'
import gestionarAccount from '../components/Settings/GestionarAccount-Settings.vue'
import gestionarAgentes from '../components/Settings/Gestion-Agentes.vue'
import FormAgentes from '../components/Settings/Form-gestionAgentes.vue'
import New_Account from '../components/Settings/New-Account.vue'
import New_AccountTelegram from '../components/Settings/New-AccountTelegram.vue'
import MessageForm from '../components/Settings/MessageForm.vue'
// import Drawer from '../components/Drawer.vue'


Vue.use(VueRouter)

const routes = [


  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
  },
  {
    path: '/integraciones',
    name: 'Integraciones',
    children: [
      { path: '', component: Telegram },
      { path: 'componente2', component: Telegram },
      { path: 'componente3', component: Whatsaap },
      { path: 'componente4', component: Facebook },
      { path: 'componente5', component: Twitter },
      { path: 'componente6', component: New_Account },
      { path: 'componente7', component: New_AccountTelegram }

    ],
    component: () => import(/* webpackChunkName: "about" */ '../views/Integraciones.vue'),

  },
  {
    path: '/settings',
    name: 'Configuraciones',
    children: [
      { path: '', component: Informacion },
      { path: 'General', component: General },
      { path: 'ChatTemplate', component: ChatTemplate },
      { path: 'Chatpredefinido', component: Chatpredefinido },
      { path: 'gestionarAgentes', component: gestionarAgentes },
      { path: 'gestionarAccount', component: gestionarAccount },
      { path: 'FormAgentes', component: FormAgentes }

    ],
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue'),
    // beforeEnter(to, from, next) {
    //   var usuario = localStorage.rol;
    //   var permiso = usuario == "Administrador" ? true : false;
    //   if (permiso) {
    //     next();
    //   }
    //   else {
    //     next({
    //       path: "/",// back to safety route //
    //     });
    //   }

    // }


  },

  {
    path: '/Chats',
    name: 'Chats',
    children: [
      { path: '', component: MessageForm },
      { path: 'MessageForm', component: MessageForm }


    ],

    component: () => import(/* webpackChunkName: "about" */ '../views/Chats.vue'),


  },



]

const router = new VueRouter({
  routes
})



export default router

