<template>
<div>
<!--RESPONSE MODAL-->
<base-dialog :show="success" title="Reviews" fixed>
<div class="centered">
<!--SUCCESS-->
<div  v-if="!apiError.error"><img alt="Subotica" src="../../assets/success.svg" width=35 hspace=4 style="vertical-align:middle">Thank you for your participation.<br><br>
We really appreciate you taking the time to share your rating with us. We look forward to seeing you again soon.
<br> <br><br>
<div class="centered"><base-button type="button" @click="goToPage('showapartment',$route.params.id)">See other reviews and ratings</base-button></div>
</div>
<!--/SUCCESS-->
<!--ERROR-->
<div v-else>
<img alt="Subotica" src="../../assets/error.svg" width=35 hspace=4 style="vertical-align:middle"> An Error occured!<br><br>
{{apiError.message}}
<br> <br><br>
<div class="centered"><base-button type="button" @click="goToPage('showapartment',$route.params.id)">See all reviews!</base-button></div>
</div>
<!--/ERROR-->

</div>
</base-dialog>
<!--/RESPONSE MODAL-->

<base-card>
<!--REVIEW FORM-->
		<h1>Reviews</h1>
		<h2>{{item.name}}</h2>
      <form @submit.prevent="sendReview">

    <div class="form-control" :class="{invalid: !review.isValid}">
      <label for="review">Your Review</label>
      <textarea id="review" rows="5" v-model.trim="review.val" @blur="clearValidity('review')" ></textarea>
      <p v-if="!review.isValid"><img  alt="Subotica" src="../../assets/error.svg" width=35 hspace=4 style="vertical-align:middle">Review must not be empty.</p>
    </div>
        
        <base-button type="button" @click="sendReview()">Save Your Review</base-button>
      </form>
<!--REVIEW /FORM-->
</base-card>


  </div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return { 
success: false,
				showResponse:false,
				comment: "",
				review: { val: '', isValid: true, },
				formIsValid: true,
				isLoading: false,
				//error: this.$store.getters.apiError,
				error: false,
				errorMessage: ""
		};
	},
		mounted() {
			this.$store.commit('apartment/setApiError',{error:false, message:""});
			const payload=this.$route.params.id;
			this.$store.dispatch('apartment/loadItem',payload)
		},
computed: {
				 item () {return this.$store.getters['apartment/item'];},
				 apiError () {return this.$store.getters['apartment/apiError'];},

			 },

methods: {
				//Reviews

				validateForm() {
					this.formIsValid = true;
					if (this.review.val === '') {
						this.review.isValid = false;
						this.formIsValid = false;
					}
				},
				clearValidity(input) {
					this[input].isValid = true;
				},

				async sendReview() {

					this.validateForm();
					if (!this.formIsValid) { return; } else {this.formSubmited=true;}

					const actionPayload = {
						//text: this.comment, 
text: this.review.val, 
		apartmentId:this.$route.params.id
					};
					try {
						this.$store.dispatch('apartment/createComment', actionPayload);
						this.$store.commit('apartment/setApiError',{error:false, message:""});
						this.success=true;
					} catch (err) {
						this.$store.commit('apartment/setApiError',{error:true, message:"Posting comment failed, please try later."});
					}

				},

				//Reviews
				goToPage(router,id) {
					if (id >0) {this.$router.push({ path: `/${router}/${id}`});}
					else {this.$router.push({ path: `/${router}` });}
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
}
.error {
	color:red;
}
label {
	font-weight: bold;
	margin-bottom: 0.5rem;
	display: block;
}
input, textarea {
	display: block;
	width: 100%;
	font: inherit;
	border: 1px solid #ccc;
	padding: 0.15rem;
}
input:focus, textarea:focus {
	border-color: #3d008d;
	background-color: #faf6ff;
	outline: none;
}
.id{
	color: #ccc;
	font-weight: normal;
}
/*Ratings */
.centered_stars {
	display: flex;
	align-items: stretch;
	margin: auto;
	width: 50%;
}
.rating_star {
	cursor: pointer;
}
.centered {
	margin-top: 20px;
	text-align: center;
	display: block;
}
.clear_button {
	background-color: gray;
}
.invalid label {
	color: red;
}

.invalid input, .invalid textarea {
	border: 1px solid red;
}
</style>
