import Vuex from 'vuex';
import { auth } from './auth.module';

const store = Vuex.createStore({
  modules: {
    auth,
  },
});

export default store;