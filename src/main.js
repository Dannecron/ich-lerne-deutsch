import Vue from 'vue';
import Vuetify from 'vuetify';
import firebase from 'firebase/app';
import VuetifyConfirm from 'vuetify-confirm';
import VueYouTubeEmbed from 'vue-youtube-embed';
import 'firebase/auth';
import 'firebase/firestore';

import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import App from '@/App.vue';
import firebaseConfig from '@/config/firebase';
import formattedDate from '@/filters/formattedDate';
import router from '@/router';
import store from '@/store';
import { setUpEventBus } from '@/utils';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

Vue.config.productionTip = false;
Vue.$db = db;

Vue.use(Vuetify);
Vue.use(VuetifyConfirm, {
    buttonTrueText: 'Да',
    buttonFalseText: 'Нет',
    width: 400,
});
Vue.use(VueYouTubeEmbed);

Vue.filter('formattedDate', formattedDate);

setUpEventBus();

new Vue({
    router,
    store,
    render: h => h(App),
    created: function onApplicationCreated() {
        firebase.auth().onAuthStateChanged((user) => {
            this.$store.dispatch('stateChanged', user);
        });

        this.$store.dispatch('loadArticles');
    },
}).$mount('#app');
