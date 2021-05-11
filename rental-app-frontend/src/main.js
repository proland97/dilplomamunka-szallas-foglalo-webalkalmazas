import { createApp } from 'vue';

import router from './router/router.js';
import store from './store/index.js';
import axios from 'axios';

import VueAxios from 'vue-axios'
import Datepicker from 'vuejs3-datepicker';
import VueStarRating from 'vue-star-rating';

import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import PictureGallery from './components/ui/PictureGallery.vue';
import Rating from './components/ui/Rating.vue';

const app = createApp(App)
app.use(router);
app.use(store);
app.use(VueAxios, axios);

app.component('star-rating', VueStarRating.default)
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('picture-gallery', PictureGallery);
app.component('datepicker', Datepicker);
app.component('star-rating', VueStarRating);
app.component('rating', Rating);

app.mount('#app');
