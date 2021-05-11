<template>
    <div v-if="coordinates === null">
        <p><strong>Map is loading</strong></p>
        <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%; background-color:#ff830a"></div>
        </div>
    </div>
    <GoogleMap
        v-else
      :api-key="apikey"
      style="width: 100%; height: 500px; border-radius: 15px"
      :center="coordinates"
      :zoom="14"
    >
      <Marker :options="{ position: coordinates }" />
    </GoogleMap>
</template>

<script>
import axios from "axios";
import { GoogleMap, Marker } from "vue3-google-map";

export default {
    props: ['address'],
    components: { GoogleMap, Marker },
    data() {
        return {
            apikey : '',
            coordinates: null,
        }
    },
    async created() {
        this.apikey = process.env.VUE_APP_GOOGLE_API_KEY;
        const params = {
            q: this.address,
            format: "json",
            polygon: 1,
            addressDetails: 1,
        };

        try {
            let response = await axios.get("https://nominatim.openstreetmap.org/search", {
                params,
            });
            if (response.data.length > 0) {
                this.coordinates = {
                    lat: parseFloat(response.data[0].lat),
                    lng: parseFloat(response.data[0].lon),
                };
            } else {
                this.coordinates = { lat: 0, lng: 0 };
            }
        } catch (err) {
            console.log(err);
            this.coordinates = { lat: 0, lng: 0 };
        }
    }
}
</script>
