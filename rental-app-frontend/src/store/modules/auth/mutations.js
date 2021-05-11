export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogout = false;
    },
    setAutoLogout(state) {
        state.didAutoLogout = true;
    },
    setApiSuccess(state, payload) {
        state.apiSuccess = payload;
    },
    setApiError(state, payload) {
        state.apiError = payload;
    },
    setApiErrorMessage(state, payload) {
        state.apiErrorMessage = payload;
    }
};