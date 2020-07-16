import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import es from 'vuetify/es5/locale/es';


Vue.use(Vuetify, {
  theme: {
    primary: '#5b3cc4',
    success: 'rgb(23, 201, 100)',
    danger: 'rgb(242, 19, 93)',
    warning: 'rgb(255, 130, 0)',
    dark: 'rgb(36, 33, 69)'

  },
  customProperties: true,
  iconfont: 'md',
})



Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { es },
    current: 'es',
  },
});
