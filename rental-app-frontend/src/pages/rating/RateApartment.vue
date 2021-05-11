<template>
<div>

<!--RESPONSE MODAL-->
<base-dialog :show="success" title="Ratings" fixed>
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
<div class="centered"><base-button type="button" @click="goToPage('showapartment',$route.params.id)">See ratings!</base-button></div>
</div>
<!--/ERROR-->

</div>
</base-dialog>
<!--/RESPONSE MODAL-->


<base-card>
<!--RAITINGS-->
<div class="centered_stars">

<div v-for="star in stars" class="centered_stars" :key="star.id">
<img @mouseover="setRating(star.id)"  @click="setRating(star.id)" v-bind:src="require('../../assets/' + star.src)" width=40 hspace=4 class="rating_star">
</div>
</div>
<div class="centered">Your Rating: {{rate}}</div>

<div class="centered">
<base-button type="button" class="clear_button"  @click="clearRating()">Clear</base-button>
<base-button type="button" @click="sendRating()">Save Your Rating</base-button>
</div>
<!--/RAITINGS-->

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
      isLoading: false,
      //error: this.$store.getters.apiError,
      //error: false,
		//errorMessage: "",
		// Ratings
		 img:"star_yellow.svg",
		 rate:0,
		 stars:[
		 {"id": 1, "src": "star_gray.svg"},
		 {"id": 2, "src": "star_gray.svg"},
		 {"id": 3, "src": "star_gray.svg"},
		 {"id": 4, "src": "star_gray.svg"},
		 {"id": 5, "src": "star_gray.svg"},
		 ]
		// /Ratings
    };
  },

	created() {
		this.success=false;
	},
	mounted() {
		const payload=this.$route.params.id;
		this.$store.dispatch('apartment/loadItem',payload)
		this.$store.commit('apartment/setApiError',{error:false, message:""});
	},
  computed: {
		item () {return this.$store.getters['apartment/item'];},
		apiError () {return this.$store.getters['apartment/apiError'];},


  },

methods: {
		//Ratings
	    setRating(id) {
			 this.rate=0;
			 for(var i=0;i <id; i++) {this.stars[i].src="star_yellow.svg"; this.rate=i+1;}
			 for(var i=id;i < 5; i++) {this.stars[i].src="star_gray.svg";}
		 },
		clearRating(id) {
			this.rate=0;
			for(var i=0;i <5; i++) {this.stars[i].src="star_gray.svg";}
		},
		sendRating() {
	      const actionPayload = {
				apartmentId:this.$route.params.id,
				stars: this.rate, 
			};
			try {
				this.$store.dispatch('apartment/createRating', actionPayload);
				this.$store.commit('apartment/setApiError',{error:false, message:""});
				this.success=true;
			} catch (err) {
				this.success=false;
				this.$store.commit('apartment/setApiError',{error:true, message:"Posting comment failed, please try later."});
			}
    },

		//Ratings
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

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

</style>
