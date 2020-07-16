import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import aws_exports from './aws-exports';
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Vue.use(Chartkick.use(Chart))
Amplify.configure(aws_exports);
Vue.use(AmplifyPlugin, AmplifyModules);



Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
