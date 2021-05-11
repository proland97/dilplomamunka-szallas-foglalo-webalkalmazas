<template>
<div>
<base-card>
<h2>Edit Your Apartment</h2>
<div >
  <div >
    <h2>{{ item.name }}</h2>
    <p>Address: {{ item.address }}</p>
    <i>{{ item.description }}</i>
    <p>Rooms: {{ item.rooms }}</p>
    <p>Price: {{ item.pricePerDay }} EUR</p>
        <base-button type="button" @click="editApartment(item.id)">Edit</base-button>
	 <hr>
  </div>
</div>
<p v-show="apiError.error">
<img alt="Error" src="../../assets/error.svg" width=35 hspace=4 style="vertical-align:middle">
{{apiError.message}}
</p>
</base-card>
</div>
</template>

<script>
export default {
	data() {
		return { 
			itemsTemp: [],
		};
	},
	mounted() {
		const payload=this.$route.params.id;
		this.$store.dispatch('apartment/loadItem',payload)
	},
	computed:{
		item () {return this.$store.getters['apartment/item'];},
		apiError () {return this.$store.getters['apartment/apiError'];},
	},
	
	methods: {
		editApartment(id){ 
			this.$router.push({ path: `/editapartment/${id}` });
		}
	}
}
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
</style>



