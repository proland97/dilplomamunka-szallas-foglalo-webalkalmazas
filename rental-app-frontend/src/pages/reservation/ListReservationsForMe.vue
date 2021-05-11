<template>
  <div>
    <section class="section section-sm">
      <div class="container">
        <h1>Reservations for my apartments</h1>

        <div v-if="reservationsForMe?.length < 1">
          <h4 class="mt-5">You dont have any reservations</h4>
        </div>
        <div class="centered mt-4">
          <div v-for="reservation in reservationsForMe" :key="reservation.id" class="item">
            <h2>Apartment name: {{ reservation.apartment.name }}</h2>
            <p>
              <strong>Check In: {{ reservation.startDate }}</strong>
            </p>
            <p>
              <strong>Check Out: {{ reservation.endDate }}</strong>
            </p>
            <p>
              <strong>User who reserved: {{ reservation.user.email }}</strong>
            </p>
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
  mounted() {
    this.$store.dispatch("apartment/loadReservationsForMe");
  },
  computed: {
    reservationsForMe() {
      return this.$store.getters["apartment/reservationsForme"];
    },
    apiError() {
      return this.$store.getters["apartment/apiError"];
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
</style>
