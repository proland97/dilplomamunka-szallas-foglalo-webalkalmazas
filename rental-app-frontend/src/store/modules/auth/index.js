import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
      apiSuccess: false, 
      apiError: false, 
      apiErrorMessage: "NO API Error" 
    };
  },
  mutations,
  actions,
  getters
};
