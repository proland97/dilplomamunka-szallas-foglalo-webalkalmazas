<template>
  <div>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>

		<h1>Log Out</h1>
		<h2>You have loged out successfuly</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
		<p v-if="!formIsValid" class="error" >
        <img  alt="Subotica" src="../../assets/error.svg" width=35 hspace=4 style="vertical-align:middle">{{errorMessage}} </p>
        <base-button type="button" @click="submitForm">Log In</base-button>
        <base-button type="button" @click="signup">Sign Up</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return { 
		email: '', 
		password: '',
      formIsValid: true,
      isLoading: false,
      error: this.$store.getters.apiError,
		errorMessage: ""
    };
  },
  computed: {
  },

	mounted() {
      this.$store.dispatch('logout');
	},

methods: {

	signup() {
      this.$router.replace('signup');
	},
    async submitForm() {
      this.formIsValid = true;
      if ( this.email === '' || !this.email.includes('@')) {
        this.formIsValid = false;
        this.errorMessage = "Please enter a valid e-mail address";
        return;
      }
      if (this.password.length < 8) {
        this.formIsValid = false;
			this.errorMessage = "Password must be at least 8 characters long, with at least two digits, and at least one uppercase letter";
        return;
      }

      this.isLoading = true;
      const actionPayload = {email: this.email, password: this.password};
      
      try {
    	  await this.$store.dispatch('login', actionPayload);
			this.$router.replace('postlogin');
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }
    	this.error =this.$store.getters.apiError;

      this.isLoading = false;
    },

    handleError() {
      this.error = null;
    }

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
	color:red;
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
  border-color: #000055;
  background-color: #faf6ff;
  outline: none;
}
</style>

