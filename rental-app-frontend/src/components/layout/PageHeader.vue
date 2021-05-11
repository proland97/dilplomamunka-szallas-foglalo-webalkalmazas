<template>
  <!-- Page Header-->
  <div>
    <div class="topnav d-flex justify-content-center" id="myTopnav">
      <span>
        <img
          alt="Subotica"
          src="../../assets/logo.svg"
          width="30"
          hspace="4"
          style="vertical-align: middle"
        />
        <router-link to="/home">HOME</router-link>
      </span>
      <span> <router-link to="/apartments">APARTMENTS</router-link> </span>
      <span> <router-link to="/about">ABOUT US</router-link> </span>
      <span> <router-link to="/contact">CONTACT</router-link> </span>
      <span v-if="isLoggedIn">
        <router-link to="/dashboard">DASHBOARD</router-link>
      </span>
      <span v-if="!isLoggedIn"> <router-link to="/login">LOGIN</router-link></span>
      <span class="loged_in_bar" v-if="isLoggedIn"
        >{{ logedInUserEmailComputed }} <a href="#" @click="logout">LOGOUT ></a>
      </span>
      <span href="javascript:void(0);" class="icon" @click="openMobileMenu()"
        >&#9776;</span
      >
    </div>
  </div>
  <!-- /Page Header-->

  <!-- Breadcrumbs -->
  <div id="nfp">
    <section
      class="breadcrumbs-custom bg-image context-dark"
      style="background-image: url(/images/breadcrumbs-image1.jpg)"
    >
      <div class="breadcrumbs-custom-inner">
        <div class="container breadcrumbs-custom-container">
          <div class="breadcrumbs-custom-main">
            <h6 class="breadcrumbs-custom-subtitle title-decorated">
              Looking for an apartment?
            </h6>
            <h1 class="breadcrumbs-custom-title">Appartments for all</h1>
          </div>
          <ul class="breadcrumbs-custom-path">
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/contact">Apartments</router-link></li>
          </ul>
        </div>
      </div>
    </section>
  </div>
  <!-- /Breadcrumbs -->
</template>

<script>
export default {
  data() {
    return {
      liue: "",
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    logedInUserEmailComputed() {
      if (this.$store.getters.logedInUserEmail) {
        return this.$store.getters.logedInUserEmail;
      } else {
        return "Log In";
      }
    },
  },

  created() {},
  mounted() {
    document.getElementById("nfp").style.display = "none";
  },
  methods: {
    openMobileMenu() {
      document.getElementById("fp").style.display = "none";
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/home");
    },
  },
};
</script>

<style scoped>
.router-link-active {
  color: #ffffff;
}
/* Add a black background color to the top navigation */
.topnav {
  font-family: "Oswald", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background-color: #0b2e43;
  overflow: hidden;

  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 100;
}

/* Style the links inside the navigation bar */
.topnav span {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 22px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Add an active class to highlight the current page */
.active {
  background-color: #033f5a;
  color: white;
}

/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
  display: none;
}

/* Dropdown container - needed to position the dropdown content */
.dropdown {
  float: left;
  overflow: hidden;
}

/* Style the dropdown button to fit inside the topnav */
.dropdown .dropbtn {
  font-size: 17px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

/* Style the dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Style the links inside the dropdown */
.dropdown-content span {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Add a dark background on topnav links and the dropdown button on hover */
.topnav span:hover,
.dropdown:hover .dropbtn {
  background-color: #555;
  color: white;
}

/* Add a grey background to dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
  color: black;
}

/* Show the dropdown menu when the user moves the mouse over the dropdown button */
.dropdown:hover .dropdown-content {
  display: block;
}

/* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
@media screen and (max-width: 600px) {
  .topnav span:not(:first-child),
  .dropdown .dropbtn {
    display: none;
  }
  .topnav span.icon {
    float: right;
    display: block;
  }
}

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive span.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive span {
    float: none;
    display: block;
    text-align: left;
  }
  .topnav.responsive .dropdown {
    float: none;
  }
  .topnav.responsive .dropdown-content {
    position: relative;
  }
  .topnav.responsive .dropdown .dropbtn {
    display: block;
    width: 100%;
    text-align: left;
  }
}
</style>
