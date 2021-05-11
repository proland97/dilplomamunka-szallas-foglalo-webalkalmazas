<template>
  <div>
    <!-- Overview-->
    <section class="section section-lg">
      <div class="container">
        <div class="row row-50 justify-content-center justify-content-lg-between">
          <div class="col-md-10 col-lg-6">
            <h2>About Us</h2>
            <h5 class="offset-top-3">
              Discovery Tour works to satisfy the increasing needs of domestic and
              international travelers.
            </h5>
            <p>
              Bromium emeritis competition est. Candidatuss messis! Nunquam anhelare
              guttus. Hercle, repressor fatalis!, cobaltum! Sunt zirbuses desiderium
              talis, pius brabeutaes. Indictio flavum ionicis tormento est. A falsis,
              acipenser fortis competition.
            </p>
            <div class="group group-middle">
              <router-link
                class="button button-primary button-winona"
                to="/signup"
                >sign up</router-link>
				<router-link
                class="button button-primary-outline button-winona"
                to="/login"
                >log in</router-link>
            </div>
          </div>
          <div class="col-md-10 col-lg-6 text-xl-right">
            <img src="images/about.jpg" alt="" width="522" height="375" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logedInUserEmail: "",
    };
  },
  mounted() {
    document.getElementById("nfp").style.display = "block";
    document.getElementById("fp").style.display = "none";
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
