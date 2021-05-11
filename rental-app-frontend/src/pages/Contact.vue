<template>
<div>
      <section class="section section-sm">
        <div class="container">
          <h2 class="mb-4">Contacts</h2>
          <div class="layout-bordered">
            <div class="layout-bordered-item wow-outer">
              <div class="layout-bordered-item-inner wow slideInUp">
                <div class="icon icon-lg mdi mdi-phone text-primary"></div>
                <ul class="list-0">
                  <li><a class="link-default" href="tel:#">+36 20 5614658</a></li>
                </ul>
              </div>
            </div>
            <div class="layout-bordered-item wow-outer">
              <div class="layout-bordered-item-inner wow slideInUp">
                <div class="icon icon-lg mdi mdi-email text-primary"></div><a class="link-default" href="mailto:#">apartment.rental.test@gmail.com</a>
              </div>
            </div>
            <div class="layout-bordered-item wow-outer">
              <div class="layout-bordered-item-inner wow slideInUp">
                <div class="icon icon-lg mdi mdi-map-marker text-primary"></div><a class="link-default" href="#">6724 Szeged, Kálvária sugárút 87/AA</a>
              </div>
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
logedInUserEmail: '', 
		};
	},
computed: {
},
created() {
},
mounted() {
 		document.getElementById("nfp").style.display = "block"
	 	document.getElementById("fp").style.display = "none"
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
</style>

