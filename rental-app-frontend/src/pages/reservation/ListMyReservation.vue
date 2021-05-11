<template>
  <div>
    <base-dialog :show="isDeleting" title="Reservation Canceletion" fixed>
      <p>Do you really want to cancel your reservation?</p>
      <h2 class="delete_title">{{ titleForDeletion }}</h2>
      <div class="d-flex justify-content-center mt-3">
        <base-button type="button" @click="deleteItem(idToDelete)" class="delete"
          >Yes</base-button
        >
        <base-button type="button" @click="cancelDeletion()" class="delete"
          >No</base-button
        >
      </div>
    </base-dialog>
    <section class="section section-sm">
      <div class="container">
        <h1>My Reservations</h1>
        <div>{{ message }}</div>

        <div v-if="myItems?.length < 1">
          <h4 class="mt-3">You dont have any reservations</h4>
        </div>
        <div class="centered">
          <div v-for="item in myItems" :key="item.id" class="item">
            <h2>{{ item.apartment.name }}</h2>
            <p>
              <strong>Check In: {{ item.startDate }}</strong>
            </p>
            <p>
              <strong>Check Out: {{ item.endDate }}</strong>
            </p>
            <span v-for="item in item.images" :key="item.id" class="item">
              <img v-bind:src="`${apiUrl}/${item.path}`" height="70" />
            </span>
            <div class="mt-3">
              <base-button
                type="button"
                @click="goToPage('showapartment', item.apartmentId)"
                >Show Apartment</base-button
              >
              <base-button
                type="button"
                @click="showCancelConfirmation(item.id, item.apartment.name)"
                class="delete"
                >Cancel Reservation</base-button
              >
              <base-button
                type="button"
                @click="goToPage('commentapartment', item.apartmentId)"
                >Review your apartment</base-button
              >
              <base-button
                type="button"
                @click="goToPage('rateapartment', item.apartmentId)"
                >Rate your apartment</base-button
              >
            </div>
            <hr />
          </div>
        </div>
        <p v-show="apiError.error">
          <img
            alt="Error"
            src="../../assets/error.svg"
            width="35"
            style="vertical-align: middle"
          />
          {{ apiError.message }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDeleting: false,
      idToDelete: null,
      titleForDeletion: "",
      message: "",
      apiUrl: "",
    };
  },
  created() {
    this.apiUrl = process.env.VUE_APP_API_URL;
  },
  mounted() {
    this.$store.dispatch("apartment/loadMyReservationItems");
  },
  computed: {
    myItems() {
      return this.$store.getters["apartment/myItems"];
    },
    apiError() {
      return this.$store.getters["apartment/apiError"];
    },
  },

  methods: {
    editApartment(id) {
      this.$router.push({ path: `/editapartment/${id}` });
    },
    showCancelConfirmation(id, title) {
      this.isDeleting = true;
      this.idToDelete = id;
      this.titleForDeletion = title;
    },
    deleteItem(id) {
      this.isDeleting = false;
      this.$store.dispatch("apartment/cancelReservation", id);
      this.message = "Reservation canceling is successfull";
    },
    cancelDeletion() {
      this.isDeleting = false;
    },
    goToPage(router, id) {
      if (id > 0) {
        this.$router.push({ path: `/${router}/${id}` });
      } else {
        this.$router.push({ path: `/${router}` });
      }
    },
  },
};
</script>

<style scoped>
.item {
  margin: 1rem 0;
  border: 1px solid #dddddd;
  border-radius: 3px;
  padding: 1rem;
  background-color: #f6f6f6;
}
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

.delete {
  background-color: #bb0000;
}
.delete:hover {
  background-color: #ff0000;
}
.delete_title {
  text-align: center;
}
.id {
  color: gray;
}
.centered {
  text-align: center;
  display: block;
}
</style>
