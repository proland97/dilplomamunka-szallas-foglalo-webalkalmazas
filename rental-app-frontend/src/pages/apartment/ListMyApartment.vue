<template>
  <div>
    <base-dialog :show="isDeleting" title="Deleting your apartment" fixed>
      <p>Do you really want to delete your apartment?</p>
      <h2 class="delete_title">{{ titleForDeletion }}</h2>
      <div class="d-flex justify-content-center mt-3">
        <base-button
          type="button"
          @click="deleteItem(idToDelete)"
          class="delete"
          >Yes</base-button
        >
        <base-button type="button" @click="cancelDeletion()" class="delete"
          >No</base-button
        >
      </div>
    </base-dialog>
    <section class="section section-sm">
      <div class="container">
        <h1>Your Apartments</h1>
        <div>{{ message }}</div>
        <div class="centered mt-4 mb-4">
          <base-button type="button" @click="goToPage('createapartment')"
            >Register new apartment</base-button
          >
        </div>
        <div  v-if="items?.length > 0" >
          <div v-for="item in items" :key="item.id" class="item">
            <h2>{{ item.name }}</h2>
            <p>Address: {{ item.address }}</p>
            <div class="row justify-content-center">
              <base-button type="button" @click="editApartment(item.id)"
                >Edit</base-button
              >
              <base-button
                type="button"
                @click="goToPage('showapartment', item.id)"
                >Show</base-button
              >
              <base-button
                type="button"
                @click="showDeleteConfirmation(item.id, item.name)"
                class="delete"
                >Delete</base-button
              >
            </div>
            <hr />
          </div>
        </div>
        <h4 v-else class="mt-3">You dont have any apartments</h4>
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
      itemsTemp: [],
      isDeleting: false,
      idToDelete: null,
      titleForDeletion: "xxkkg",
      message: "",
    };
  },
  mounted() {
    this.$store.dispatch("apartment/loadMyItems");
  },
  computed: {
    items() {
      return this.$store.getters["apartment/items"];
    },
    apiError() {
      return this.$store.getters["apartment/apiError"];
    },
  },

  methods: {
    editApartment(id) {
      this.$router.push({ path: `/editapartment/${id}` });
    },
    showDeleteConfirmation(id, title) {
      this.isDeleting = true;
      this.idToDelete = id;
      this.titleForDeletion = title;
    },
    deleteItem(id) {
      this.isDeleting = false;
      this.$store.dispatch("apartment/deleteItem", id);
      this.message = "Deletion is successfull";
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
