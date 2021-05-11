export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        if (state.token != localStorage.token) { return false }
        return !!state.token;
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    },
    apiSuccess(state) {
        return state.apiSuccess;
    },
    apiError(state) {
        return state.apiError;
    },
    apiErrorMessage(state) {
        return state.apiErrorMessage;
    },
    logedInUserEmail(state) {
        return state.userId;
    }

};