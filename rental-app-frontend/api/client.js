import axios from 'axios';

export class Client {
    static API_URL = process.env.VUE_APP_API_URL;

    static instance;

    static getInstance = () => {
        if (!Client.instance) {
            Client.instance = new Client();
        }
        return Client.instance;
    }

    get = (target) => {
        return axios.get(`${Client.API_URL}/${target}`)
    }

    post = (target, data) => {
        return axios.post(`${Client.API_URL}/${target}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    put = (target, data) => {
        return axios.put(`${Client.API_URL}/${target}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    delete = (target) => {
        return axios.delete(`${Client.API_URL}/${target}`)
    }
}