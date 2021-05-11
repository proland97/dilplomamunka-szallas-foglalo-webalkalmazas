let timer;
const API_URL = process.env.VUE_APP_API_URL;
const SITE_URL = process.env.VUE_APP_SITE_URL;
import axios from 'axios';
import router from "../../../router/router"
export default {
    // SIGNUP
    signup(context, payload) {
        context.commit('setApiError', { error: false });
        const urlpost = API_URL + "/auth/signup";
        axios.post(urlpost, payload)
            .then(
                responseData => {
                    context.commit('setApiSuccess', true);
                    context.commit('setApiError', false);
                    context.commit('setApiErrorMessage', "");
                }
            )
            .catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    // console.log(error.response.data);
                    context.commit('setApiSuccess', false);
                    context.commit('setApiError', true);
                    context.commit('setApiErrorMessage', error.response.data.error);
                } else if (error.request) {
                    // The request was made but no response was received
                    context.commit('setApiSuccess', false);
                    context.commit('setApiErrorMessage', 'Server error. Please try later!');
                } else {
                    // Something happened in setting up the request that triggered an Error
                }
            })
    },

    // LOGIN 
    login(context, payload) {
        const urlpost = API_URL + "/auth/login";
        axios.post(urlpost, payload)
            .then(responseData => {
                // EWERITHING IS OK
                const expiresIn = +3600000;
                //const expiresIn = +10 * 1000;
                const expirationDate = new Date().getTime() + expiresIn;
                timer = setTimeout(function() { context.dispatch('autoLogout'); }, expiresIn);
                context.commit('setUser', { token: responseData.data.authToken, userId: payload.email });

                localStorage.setItem('token', responseData.data.authToken);
                localStorage.setItem('userId', payload.email);
                localStorage.setItem('tokenExpiration', expirationDate);
                context.commit('setApiError', false);
                context.commit('setApiErrorMessage', "");

                router.push("/dashboard");
            })
            .catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    context.commit('setApiError', true);
                    context.commit('setApiErrorMessage', error.response.data.error);
                } else if (error.request) {
                    context.commit('setApiError', { error: true });
                    context.commit('setApiErrorMessage', 'Server error. Please try later!');
                    // The request was made but no response was received
                    //context.commit('setApiErrorMessage',{message:'Server error. Please try later!'});
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    // context.commit('setApiError', true);
                    // context.commit('setApiErrorMessage', error.response.data.error);
                }
            })
    },





    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId
            });
        }
    },




    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');
        clearTimeout(timer);
        context.commit('setUser', { token: null, userId: null });
    },

    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    },
    setApiError(context, payload) {
        context.dispatch('setApiError');
    },
    setApiErrorMessage(context, payload) {
        context.dispatch('setApiErrorMessage');
    }
};