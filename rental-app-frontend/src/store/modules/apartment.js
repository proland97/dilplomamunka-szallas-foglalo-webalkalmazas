const API_URL = process.env.VUE_APP_API_URL;
const SITE_URL = process.env.VUE_APP_SITE_URL;
import axios from 'axios';
import router from "../../router/router"
export default {

    namespaced: true,
    state() {
        return {
            idCurrent: 1,
            apiCounter: 0,
            ratingAvg: null,
            ratingNum: null,
            reservedDays: [],
            totalNumberOfApartments: null,
            items: [],
            comments: [],
            item: "",
            itemFromDatabase: { name: "", description: "", address: "", rooms: null, pricePerDay: null },
            idCreated: null,
            apiError: { error: false, message: 'No errors' },
            lastFetch: null,
            apartment: null,
            myapartments: [],
            apiErrorMessageLocal: "",
            apiErrorLocal: false,
            message: "",
        };
    },

    //GETTERS
    getters: {

        idCurrent(state) {
            return state.idCurrent;
        },
        items(state) {
            return state.items;
        },
        myItems(state) {
            return state.myItems;
        },
        reservationsForme(state) {
            return state.reservationsForme;
        },
        item(state) {
            return state.item;
        },
        itemFromDatabase(state) {
            return state.item;
        },
        totalNumberOfApartments(state) {
            return state.totalNumberOfApartments;
        },
        comments(state) {
            return state.comments;
        },

        ratingAvg(state) {
            return state.ratingAvg;
        },
        apiCounter(state) {
            return state.apiCounter;
        },
        ratingNum(state) {
            return state.ratingNum;
        },
        shouldUpdate(state) {
            const lastFetch = state.lastFetch;
            if (!lastFetch) {
                return true;
            }
            const currentTimeStamp = new Date().getTime();
            return (currentTimeStamp - lastFetch) / 1000 > 60;
        },

        idCreated(state) {
            return state.idCreated;
        },
        apiError(state) {
            return state.apiError;
        },
        message(state) {
            return state.message;
        },
        reservedDays(state) {
            return state.reservedDays;
        },
        ooo(state) {
            return state.ooo;
        },

    },
    // \GETTERS

    // MUTATIONS
    mutations: {

        setIdCurrent(state, payload) {
            state.idCurrent = payload;
        },
        registerApartment(state, payload) {
            state.apartments.push(payload);
        },
        setApartments(state, payload) {
            state.apartments = payload;
        },
        setMyApartments(state, payload) {
            state.myapartments = payload;
        },
        setFetchTimestamp(state) {
            state.lastFetch = new Date().getTime();
        },
        setApiCounter(state, payload) {
            state.apiCounter = payload;
        },
        setIdCreated(state, payload) {
            state.idCreated = payload;
        },
        setItems(state, payload) {
            state.items = payload;
        },
        setComments(state, payload) {
            state.comments = payload;
        },
        setMyItems(state, payload) {
            state.myItems = payload;
        },
        setReservationForMe(state, payload) {
            state.reservationsForme = payload
        },
        setItem(state, payload) {
            state.item = payload;
        },
        setTotalNumberOfApartments(state, payload) {
            state.totalNumberOfApartments = payload;
        },
        setRatingAvg(state, payload) {
            state.ratingAvg = payload;
        },
        setRatingNum(state, payload) {
            state.ratingNum = payload;
        },
        setItemFromDatabase(state, payload) {
            state.itemFromDatabase = payload;
        },
        setApiError(state, payload) {
            state.apiError = payload;
        },
        //****************
        setApiErrorMessageLocal(state, payload) {
            state.apiErrorMessageLocal = payload.message;
        },
        setApiErrorLocal(state, payload) {
            state.apiErrorLocal = payload.error;
        },

        setMessage(state, payload) {
            state.message = payload;
        },
        setReservedDays(state, payload) {
            state.reservedDays = payload;
        },
        setOoo(state, payload) {
            state.ooo = payload;
        },

    },
    //\MUTATIONS

    //ACTIONS
    actions: {

        deleteItem(context, payload) {
            const url = `${API_URL}/apartment/${payload}`;
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            axios.delete(url, config)
                .then(response => {
                    response.data;
                    context.dispatch('loadMyItems')

                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });

                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: 'Server error. Please try later!' });
                    } else {
                        console.log('Error', error.message);
                    }
                })

        },

        //CREATE NEW RECORD NEW
        createItemNew(context, payload) {
            const dataPayload = payload[0];
            const filePayload = payload[1];
            const urlpost = `${API_URL}/apartment`;
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            axios.post(urlpost, dataPayload, config)
                .then(response => {
                    context.commit('setIdCreated', response.data.id);
                    filePayload.append('apartmentId', context.getters.idCreated);

                    // UPLOAD FILES
                    const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
                    const url = `${API_URL}/image/upload-images`;
                    axios.post(url, filePayload, config)
                        .then(response => {
                            // Read again form database
                            const id = context.getters.idCreated;
                            router.push(`/showapartment/${context.getters.idCreated}`);
                        })
                        .catch((error) => {
                            if (error.response) {
                                // Request made and server responded
                                console.log("API Error message: " + JSON.stringify(error.response.data.error));
                                console.log(error.response);
                            } else if (error.request) {
                                // The request was made but no response was received
                                console.log('Error', error.message);
                            } else {
                                // Something happened in setting up the request that triggered an Error
                                console.log('Error', error.message);
                            }
                        })
                        // UPLOAD FILES

                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });

                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });
                    } else {
                        console.log('Error', error.message);
                    }
                    router.push(`/showapartment/${context.getters.idCreated}`);
                })
        },

        //CREATE NEW RECORD NEW

        //Create New Record
        createItem(context, payload) {
            const dataPayload = payload[0];
            const filePayload = payload[1];
            const urlpost = `${API_URL}/apartment`;
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            axios.post(urlpost, dataPayload, config)
                .then(response => {
                    context.commit('setIdCreated', response.data.id);
                    //Reading newly created record from database and set it in store state: itemFromDatabase
                    //
                    const url = `${API_URL}/apartment/${response.data.id}`;
                    axios.get(url)
                        .then(response => {
                            context.commit('setItemFromDatabase', response.data);
                        })
                        //

                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });

                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });
                    } else {
                        console.log('Error', error.message);
                    }
                })
        },
        //upload files
        uploadFile(context, payload) {
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            const url = `${API_URL}/image/upload-images`;
            axios.post(
                    url,
                    payload,
                    config,
                )
                .then(response => {
                    // Read again form database
                    const id = context.getters.idCreated;
                    //const id =27;

                    axios.get(`${API_URL}/apartment/${id}`)
                        .then(response => {
                            context.commit('setItemFromDatabase', response.data);
                        })
                        //Read again form database
                })
                .catch((error) => {
                    if (error.response) {
                        // Request made and server responded
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log('Error', error.message);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                })
        },
        //upload files


        loadItem(context, payload) {
            const url = `${API_URL}/apartment/${payload}`;
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            axios.get(url, config)
                .then(response => {
                    response.data
                    context.commit('setItem', response.data)
                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });

                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: 'Server error. Please try later!' });
                    } else {
                        console.log('Error', error.message);
                    }
                })
        },

        loadItems(context) {
            const url = `${API_URL}/apartment`;
            const config = {};
            axios.get(url, config)
                .then(response => {
                    response.data
                    context.commit('setItems', response.data)
                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });

                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: 'Server error. Please try later!' });
                    } else {
                        console.log('Error', error.message);
                    }
                })
        },
        loadItemsPagination(context, payload) {
            const url = `${API_URL}/apartment?limit=${payload.limit}&offset=${payload.offset}`;
            const config = {};
            axios.get(url, config)
                .then(response => {
                    const apartmentsRes = response.data.apartments;
                    // *******************
                    const newItems = apartmentsRes.map(
                        (item) => {
                            let coverImage = "";
                            if (item.images.length > 0) {
                                coverImage = API_URL + "/" + item.images[0].path;
                            } else {
                                coverImage = SITE_URL + "/images/nia.jpg";
                            }
                            return {
                                id: item.id,
                                name: item.name,
                                address: item.address,
                                description: item.description,
                                rooms: item.rooms,
                                pricePerDay: item.pricePerDay,
                                coverImage: coverImage,
                                countAmenities: item.amenities.length,
                                countReservations: item.reservations.length,
                                countComments: item.comments.length
                            }
                        });
                    //*******
                    //context.commit('setItems', response.data.apartments)
                    const apiCounter = context.getters.apiCounter + 1;
                    context.commit('setApiCounter', apiCounter)
                    context.commit('setItems', newItems)
                    context.commit('setTotalNumberOfApartments', response.data.count)
                })

            .catch((error) => {
                if (error.response) {
                    context.commit('setApiError', { error: true, message: error.response.data.error });

                } else if (error.request) {
                    context.commit('setApiError', { error: true, message: 'Server error. Please try later!' });
                } else {
                    console.log('Error', error.message);
                }
            })
        },
        loadMyItems(context) {
            const url = API_URL + "/apartment/own";
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            axios.get(url, config)
                .then(response => {
                    response.data;
                    context.commit('setItems', response.data)
                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });

                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: 'Server error. Please try later!' });
                    } else {
                        console.log('Error', error.message);
                    }
                })
        },

        loadComments(context, payload) {
            const url = `${API_URL}/comment/apartment/${payload}`;
            const config = {};
            axios.get(url, config)
                .then(response => {
                    response.data;
                    context.commit('setComments', response.data)
                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });

                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: 'Server error. Please try later!' });
                    } else {
                        console.log('Error', error.message);
                    }
                })
        },
        // RESERVATIONS
        // Reserved Days
        loadReservedDays(context, payload) {
            const url = `${API_URL}/reservation/apartment/${payload}`;
            const config = {};
            axios.get(url, config)
                .then(response => {
                    response.data;
                    // CONVERT
                    const items = response.data;

                    function getDaysArray(start, end) {
                        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
                            arr.push(new Date(dt));
                        }
                        return arr;
                    }
                    var newItems = [];
                    for (var j = 0; j < items.length; j++) {
                        var daylist = getDaysArray(new Date(items[j].startDate), new Date(items[j].endDate));
                        for (var i = 0; i < daylist.length - 1; i++) {
                            newItems.push(daylist[i]);
                        }
                    }
                    context.commit('setReservedDays', newItems)
                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });

                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: 'Server error. Please try later!' });
                    } else {
                        console.log('Error', error.message);
                    }
                })
        },
        // /Reserved Days

        // Own reservations
        loadMyReservationItems(context) {
            const url = `${API_URL}/reservation/own`;
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            axios.get(url, config)
                .then(response => {
                    response.data;
                    context.commit('setMyItems', response.data)
                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });

                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: 'Server error. Please try later!' });
                    } else {
                        console.log('Error', error.message);
                    }
                })
        },
        // /Own reservations

        async loadReservationsForMe(context) {
            const url = `${API_URL}/reservation/to-me`;
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            try {
                let response = await axios.get(url, config)
                context.commit('setReservationForMe', response.data)
            } catch (error) {
                if (error.response) {
                    context.commit('setApiError', { error: true, message: error.response.data.error });

                } else if (error.request) {
                    context.commit('setApiError', { error: true, message: 'Server error. Please try later!' });
                } else {
                    console.log('Error', error.message);
                }
            }
        },

        // New reservations
        createReservation(context, payload) {

            const urlpost = `${API_URL}/reservation`;
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            axios.post(urlpost, payload, config)
                .then(response => {
                    context.commit('setApiError', { error: false, message: "" });
                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });
                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });
                    } else {
                        console.log('Error', error.message);
                    }
                })
        },
        // /New reservations

        // Cancel Reservation
        cancelReservation(context, payload) {
            const url = `${API_URL}/reservation/${payload}`;
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            axios.delete(url, config)
                .then(response => {
                    response.data;
                    context.dispatch('loadMyReservationItems')
                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });
                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: 'Server error. Please try later!' });
                    } else {
                        console.log('Error', error.message);
                    }
                })

        },
        // /Cancel Reservation
        // /RESERVATIONS

        // REVIEWS & RATINGS 

        // New rating 
        createRating(context, payload) {
            context.commit('setApiError', { error: false, message: "" });
            const urlpost = `${API_URL}/rating`;
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            axios.post(urlpost, payload, config)
                .then(response => {
                    context.commit('setApiError', { error: false, message: "" });
                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });
                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });
                    } else {
                        console.log('Error', error.message);
                    }
                })
        },
        // /New rating 
        // New comment 
        createComment(context, payload) {
            context.commit('setApiError', { error: false, message: "" });
            const urlpost = `${API_URL}/comment`;
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            axios.post(urlpost, payload, config)
                .then(response => {
                    context.commit('setApiError', { error: false, message: "" });
                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });
                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });
                    } else {
                        console.log('Error', error.message);
                    }
                })
        },
        // /New comment 
        loadRating(context, payload) {
            const url = `${API_URL}/rating/stat/apartment/${payload}`;
            const config = { headers: { 'Authorization': `Basic ${context.rootGetters.token}` } };
            axios.get(url, config)
                .then(response => {
                    response.data
                    context.commit('setRatingAvg', response.data.avg)
                    context.commit('setRatingNum', response.data.ratingsNum)
                })
                .catch((error) => {
                    if (error.response) {
                        context.commit('setApiError', { error: true, message: error.response.data.error });

                    } else if (error.request) {
                        context.commit('setApiError', { error: true, message: 'Server error. Please try later!' });
                    } else {
                        console.log('Error', error.message);
                    }
                })
        },

        // REVIEWS & RATINGS 
        //*****************************************
    }
    //\ACTIONS
};