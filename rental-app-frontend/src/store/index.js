import { createStore } from 'vuex';
import apartmentModule from './modules/apartment.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    apartment: apartmentModule,
    auth: authModule
  }
});

export default store;
