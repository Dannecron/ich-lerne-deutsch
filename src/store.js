import Vue from 'vue';
import Vuex from 'vuex';

import articleModule from '@/store/articles';
import generalModule from '@/store/general';
import userModule from '@/store/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    articleModule,
    generalModule,
    userModule,
  },
});
