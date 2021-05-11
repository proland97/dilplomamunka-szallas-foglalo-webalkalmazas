import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Contact from '../pages/Contact.vue';
import SignUp from '../pages/auth/SignUp.vue';
import LogIn from '../pages/auth/LogIn.vue';
import LogOut from '../pages/auth/LogOut.vue';
import Dashboard from '../pages/auth/Dashboard.vue';

import ListApartmentPagination from '../pages/apartment/ListApartmentPagination.vue';
import RateApartment from '../pages/rating/RateApartment.vue';
import CommentApartment from '../pages/comment/CommentApartment.vue';
import ListMyApartment from '../pages/apartment/ListMyApartment.vue';
import ListMyReservation from '../pages/reservation/ListMyReservation.vue';
import ListReservationsForMe from '../pages/reservation/ListReservationsForMe';
import ShowApartment from '../pages/apartment/ShowApartment.vue';
import CreateApartment from '../pages/apartment/CreateApartment.vue';
import EditApartment from '../pages/apartment/EditApartment.vue';

import NotFound from '../pages/NotFound.vue';

import store from '../store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [

        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/about', component: About },
        { path: '/contact', component: Contact },

        // AUTH 
        { path: '/signup', component: SignUp, meta: { requiresUnauth: true } },
        { path: '/login', component: LogIn, meta: { requiresUnauth: true } },
        { path: '/logout', component: LogOut },
        { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
        // AUTH 

        // APARTMENT 
        { path: '/apartments', component: ListApartmentPagination },
        { path: '/commentapartment/:id', component: CommentApartment, meta: { requiresAuth: true } },
        { path: '/rateapartment/:id', component: RateApartment, meta: { requiresAuth: true } },
        { path: '/listmyapartment', component: ListMyApartment, meta: { requiresAuth: true } },
        { path: '/listmyreservation', component: ListMyReservation, meta: { requiresAuth: true } },
        { path: '/listreservationsforme', component: ListReservationsForMe, meta: { requiresAuth: true } },
        { path: '/showapartment/:id', component: ShowApartment },
        { path: '/editapartment/:id', component: EditApartment, meta: { requiresAuth: true } },
        { path: '/createapartment', component: CreateApartment, meta: { requiresAuth: true } },
        // APARTMENT 

        { path: '/:notFound(.*)', component: NotFound }
    ]
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/login');
        store.dispatch('logout')
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/apartments');
    } else {
        next();
    }
});

export default router;