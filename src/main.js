import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import loader from "vue-ui-preloader";
import vuelidate, {Vuelidate} from "vuelidate";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuelidate,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.use(loader);
Vue.use(Vuelidate);
