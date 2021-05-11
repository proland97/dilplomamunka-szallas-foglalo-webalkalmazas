<template>
  <div>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <h2>Sign Up</h2>
      <form @submit.prevent="submitForm" v-show="!apiSuccess">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="email">Username</label>
          <input type="username" id="username" v-model.trim="username" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <div class="form-control">
          <label for="password">Confirm Password</label>
          <input type="password" id="password_confirm" v-model.trim="password_confirm" />
        </div>

        <!-- Prevalidation Error -->
        <div class="d-flex" v-if="!formIsValid">
          <img
            class="mr-2"
            alt=""
            src="../../assets/error.svg"
            width="35"
            style="vertical-align: middle"
          />
          <p class="error mt-0 d-flex align-items-center">
            {{ errorMessage }}
          </p>
        </div>
        <!--/ Prevalidation Error -->

        <!-- API Error -->
        <div class="d-flex mt-2" v-if="apiError">
          <img
            class="mr-2"
            alt=""
            src="../../assets/error.svg"
            width="35"
            style="vertical-align: middle"
          />
          <p class="error mt-0 d-flex align-items-center">
            {{ apiEerrorMessage }}
          </p>
        </div>
        <!-- /API Error -->

        <div class="d-flex justify-content-center">
          <base-button type="button" @click="submitForm">Sign Up</base-button>
        </div>
      </form>

      <!-- SignUp Success -->
      <div v-if="apiSuccess">
        <br />
        <h3>
          <img
            alt="Subotica"
            src="../../assets/success.svg"
            width="35"
            hspace="4"
            style="vertical-align: middle"
          />
          You have successfully registered!
        </h3>
        <h5>Thank you for your registration!</h5>
        <h5>
          To make yuor reservation, or upload you apartment, please
          <router-link to="/login">log in first</router-link>!
        </h5>
      </div>
      <!-- /SignUp Success -->
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
      password_confirm: "",
      showSuccess: true,
      formIsValid: true,
      isLoading: false,
      errorX: this.$store.getters.apiError,
      errorMessage: "",
    };
  },
  computed: {
    apiSuccess() {
      return this.$store.getters.apiSuccess;
    },
    apiError() {
      return this.$store.getters.apiError;
    },
    apiEerrorMessage() {
      return this.$store.getters.apiErrorMessage;
    },
  },
  mounted() {
    document.getElementById("nfp").style.display = "block";
    document.getElementById("fp").style.display = "none";
    this.$store.commit("setApiError", false);
    this.$store.commit("setApiErrorMessage", "");
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      //if ( this.email === '' || !this.email.includes('@')) {
      if (!this.validateEmail(this.email)) {
        this.formIsValid = false;
        this.errorMessage = "Please enter a valid e-mail address!";
        return;
      }
      if (!this.validateUsername(this.username)) {
        this.formIsValid = false;
        this.errorMessage = "Please enter a valid username!";
        return;
      }
      //if (this.password.length < 8) {
      if (!this.validatePassword(this.password)) {
        this.formIsValid = false;
        this.errorMessage =
          "Password must be at least 7 characters long, contain at least one upper case and two digits!";
        return;
      }

      if (this.password != this.password_confirm) {
        this.formIsValid = false;
        this.errorMessage = "Password and Confirm Password do not match!";
        return;
      }

      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        username: this.username,
        password: this.password,
      };

      try {
        await this.$store.dispatch("signup", actionPayload);

        var eee = this.$store.getters.apiError;

        if (!eee) {
          this.$router.replace("postsignup");
        }
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try laterx.";
      }
      this.error = this.$store.getters.apiError;

      this.isLoading = false;
    },

    validateEmail(emailToTest) {
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      return expression.test(emailToTest.toLowerCase());
    },

    validateUsername(usernameToTest) {
      if (usernameToTest == "") {
        return false;
      } else {
        return true;
      }
    },
    validatePassword(passwordToTest) {
      const expression = /^(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z])/;
      var valid = expression.test(passwordToTest);
      return valid;
    },

    handleError() {
      this.error = null;
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
  border: none;
}

.error {
  color: red;
  font-size: 16px;
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
