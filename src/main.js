import Vue from 'vue';
import Vuetify from 'vuetify';
import firebase from 'firebase/app';
import VuetifyConfirm from 'vuetify-confirm';
import 'firebase/auth';

import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import firebaseConfig from '@/config/firebase';

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Да',
  buttonFalseText: 'Нет',
  width: 400,
});

new Vue({
  router,
  store,
  render: h => h(App),
  created: function onApplicationCreated() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('stateChanged', user);
    });
  }
}).$mount('#app');
