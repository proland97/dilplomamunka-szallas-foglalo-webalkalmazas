<template>
  <div>
    <section class="section section-sm">
      <div class="container">
        <h2 class="mb-4">Dashboard</h2>
        <div class="row">
          <div class="layout-bordered-item wow-outer col-lg-3 col-md-6 d-flex justify-content-center mt-3 mb-3">
              <base-button type="button" @click="goToPage('createapartment')"
                >Register your Apartment</base-button
              >
          </div>
          <div class="layout-bordered-item wow-outer col-lg-3 col-md-6 d-flex justify-content-center mt-3 mb-3">
            <base-button type="button" @click="goToMyApartments"
              >Show My Apartments</base-button
            >
          </div>
          <div class="layout-bordered-item wow-outer col-lg-3 col-md-6 d-flex justify-content-center mt-3 mb-3">
            <base-button type="button" @click="goToPage('listmyreservation')"
              >Show My Reservations</base-button
            >
          </div>
          <div class="layout-bordered-item wow-outer col-lg-3 col-md-6 d-flex justify-content-center mt-3 mb-3">
            <base-button type="button" @click="goToPage('listreservationsforme')"
              >Show Reservations for my apartments</base-button
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
  },

  mounted() {
    document.getElementById("nfp").style.display = "block";
    document.getElementById("fp").style.display = "none";
  },
  computed: {
    message() {
      return this.$store.getters["apartment/message"];
    },
  },

  methods: {
    goToMyApartments() {
      this.$router.replace("listmyapartment");
    },
    goToPage(router) {
      this.$router.push({ path: `/${router}` });
      //this.$router.push({ path: `/${router}/${id}` });
    },
    goToRegisterNewApartment() {
      this.$router.replace("apartmentregistration");
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

.error {
  color: red;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
