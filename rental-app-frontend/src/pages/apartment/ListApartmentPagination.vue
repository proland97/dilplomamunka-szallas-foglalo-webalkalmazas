<template>
  <section class="section section-sm pt-3">
    <div class="container">
      <h1 class="text-center">Apartments</h1>

      <!-- RD Search-->
      <form
        class="rd-form rd-search rd-search-classic"
        action="search-results.html"
        method="GET"
      >
        <div class="form-wrap-inner">
          <input
            v-model="search"
            placeholder="Search for apartments..."
            class="form-input"
            id="rd-search-form-input"
            type="text"
            name="s"
            v-on:keydown.enter.prevent=''
            autocomplete="off"
          />
          <button :disabled="true" class="rd-search-submit" aria-label="Submit"></button>
        </div>
      </form>
      <!-- /RD Search-->

      <!-- Pagination Navbar-->
      <div class="row justify-content-center">
        <p class="mb-2">
          <strong> {{ showPagination }} / {{ total }} Apartments</strong>
        </p>
      </div>
      <nav aria-label="Page navigation example  centered">
        <div class="row justify-content-center">
          <ul class="pagination">
            <li class="page-item">
              <span class="page-link move" @click="pagination(previousPage)"
                ><svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  style="
                    display: block;
                    fill: none;
                    height: 16px;
                    width: 16px;
                    stroke: currentcolor;
                    stroke-width: 3px;
                    overflow: visible;
                  "
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <g fill="none">
                    <path
                      d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"
                    ></path>
                  </g></svg
              ></span>
            </li>
            <li
              :class="item.className"
              v-for="item in pageNavbar"
              :key="item.page"
              :id="item.page"
            >
              <span class="page-link" @click="pagination(item.page)">{{
                item.page + 1
              }}</span>
            </li>
            <li class="page-item">
              <span class="page-link move" @click="pagination(nextPage)">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  style="
                    display: block;
                    fill: none;
                    height: 16px;
                    width: 16px;
                    stroke: currentcolor;
                    stroke-width: 3px;
                    overflow: visible;
                  "
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <g fill="none">
                    <path
                      d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"
                    ></path>
                  </g>
                </svg>
              </span>
            </li>
          </ul>
        </div>
      </nav>
      <!-- /Pagination Navbar-->

      <!-- Items -->
      <div v-for="item in filteredItems" :key="item.id" class="xitem">
        <h2>
          <span class="title" v-html="item.name" v-on:click="goToPage(item.id)"></span>
        </h2>

        <!-- Overview from templage-->
        <section class="section section-lg pt-5 pb-5">
          <div class="container">
            <div class="row row-50 justify-content-center justify-content-lg-between">
              <div class="col-md-10 col-lg-6">
                <h5 class="offset-top-3">{{ item.address }}</h5>
                <p>{{ item.description }}</p>
                <div class="group group-middle">
                  <a
                    class="button button-primary button-winona white_text"
                    v-on:click="goToPage(item.id)"
                    data-waypoint-to="#our-history"
                    >View Details</a
                  >
                  <a
                    class="button button-primary-outline button-winona"
                    v-on:click="goToPage(item.id)"
                    >Price: {{ item.pricePerDay }} EUR</a
                  >
                </div>
              </div>
              <div class="col-md-10 col-lg-6 text-xl-right">
                <img
                  v-bind:src="item.coverImage"
                  class="item_image"
                  width="522"
                  height="375"
                />
              </div>
            </div>
          </div>
        </section>
        <!-- /Overview from templage-->

        <!-- Counters-->
        <section
          class="section section-lg text-center o-small-padding"
          style="padding-top: 5px; padding-bottom: 35px"
        >
          <div class="row row-50">
            <div class="col-6 col-md-3">
              <!-- Counter Minimal-->
              <article class="counter-minimal">
                <div class="counter-minimal-icon linearicons-license"></div>
                <div class="counter-minimal-main">
                  <div class="counter">{{ item.rooms }}</div>
                </div>
                <h5 class="counter-minimal-title">Number or rooms</h5>
              </article>
            </div>
            <div class="col-6 col-md-3">
              <!-- Counter Minimal-->
              <article class="counter-minimal">
                <div class="counter-minimal-icon linearicons-sun"></div>
                <div class="counter-minimal-main">
                  <div class="counter">{{ item.countAmenities }}</div>
                </div>
                <h5 class="counter-minimal-title">Amenities</h5>
              </article>
            </div>
            <div class="col-6 col-md-3">
              <!-- Counter Minimal-->
              <article class="counter-minimal">
                <div class="counter-minimal-icon linearicons-star"></div>
                <div class="counter-minimal-main">
                  <div class="counter">{{ item.countComments }}</div>
                </div>
                <h5 class="counter-minimal-title">Reviews</h5>
              </article>
            </div>
            <div class="col-6 col-md-3">
              <!-- Counter Minimal-->
              <article class="counter-minimal">
                <div class="counter-minimal-icon linearicons-user"></div>
                <div class="counter-minimal-main">
                  <div class="counter">{{ item.countReservations }}</div>
                </div>
                <h5 class="counter-minimal-title">Reservations</h5>
              </article>
            </div>
          </div>
        </section>
        <!-- Counters-->
        <div class="career-classic-divider"></div>
      </div>
      <!--/Items -->

      <!--API Error -->
      <p v-show="apiError.error">
        <img
          alt="Error"
          src="../../assets/error.svg"
          width="35"
          style="vertical-align: middle"
        />
        {{ apiError.message }}
      </p>
      <!--/API Error -->
    </div>
    <div class="progress-container">
      <div id="scrollprogress" class="progress-container-inner"></div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      items: [],
      itemsTemp: [],
      pageNavbar: [],
      isDeleting: false,
      idToDelete: null,
      message: "",
      totalPages: 1,
      totalRecords: 1,
      recordPerPage: 5,
      currentPage: 0,
      previousPage: 0,
      nextPage: 1,
    };
  },
  mounted() {
    document.getElementById("nfp").style.display = "block";
    document.getElementById("fp").style.display = "none";
    this.scrollTop()
    const payload = { limit: this.recordPerPage, offset: 0 };
    this.$store.dispatch("apartment/loadItemsPagination", payload);
    this.handleScroll();
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    showPagination() {
      if (this.currentPage === 0) {
        return `0 - ${this.recordPerPage}`;
      } else if (
        this.currentPage * this.recordPerPage + this.recordPerPage >
        this.total
      ) {
        let start = this.currentPage * this.recordPerPage;
        return `${start} - ${this.total}`;
      } else {
        let start = this.currentPage * this.recordPerPage;
        let end = start + this.recordPerPage;
        return `${start} - ${end}`;
      }
    },
    filteredItems() {
      let apartments = this.$store.getters["apartment/items"]
      return apartments.filter((item) => {
        return item.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
    apiError() {
      return this.$store.getters["apartment/apiError"];
    },
    total() {
      var pageNavbar = [];
      var totalRecords = this.$store.getters["apartment/totalNumberOfApartments"];
      var totalPages = Math.ceil(totalRecords / this.recordPerPage);
      for (var i = 0; i < totalPages; i++) {
        var className = "";
        if (i == 0) {
          className = "page-item active";
        } else {
          className = "page-item";
        }
        var jo = { page: i, className: className };
        pageNavbar.push(jo);
      }
      this.totalPages = totalPages;
      this.pageNavbar = pageNavbar;

      return totalRecords;
    },
  },

  methods: {
    scrollTop() {
          window.scrollTo(0,0);
    },
    handleScroll(event) {
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      let height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrolled = (winScroll / height) * 100;
      let scroll = document.querySelector("#scrollprogress");
      scroll.style.width = scrolled + "%";
    },

    goToPage(id) {
      this.$store.commit("apartment/setIdCurrent", id);
      this.$router.push({ path: `/showapartment/${id}` });
    },
    pagination(p) {
      this.currentPage = p;
      var offset = p * this.recordPerPage;
      const payload = { limit: this.recordPerPage, offset: offset };
      this.$store.dispatch("apartment/loadItemsPagination", payload);

      for (var i = 0; i < this.totalPages; i++) {
        document.getElementById(i).className = "page-item";
      }
      document.getElementById(p).className = "page-item active";
      this.nextPage = p + 1;
      this.previousPage = p - 1;
      if (p == 0) {
        this.previousPage = p;
      }
      if (p == this.totalPages - 1) {
        this.nextPage = p;
      }
      this.search = "";
    },
  },
};
</script>

<style scoped>
.move {
  border-radius: 50%;
}

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

#centered {
  text-align: center;
  display: block;
}
.title {
  cursor: pointer;
  color: #000077;
  font-size: 3rem;
}
.title:hover {
  color: #aa0000;
}
.id {
  color: gray;
  font-size: 2rem;
}
a.white_text {
  color: white;
}

a:hover.white_text {
  color: white;
}
o-small-padding {
  padding: 10px !important;
}

.yyy {
  background-color: orange;
  margin-top: -50px;
  margin-bottom: -30px;
}

.progress-container {
  width: 100%;
  height: 8px;
  background-color: #d3d3d3;
  position: fixed;
  bottom: 0px;
  /* margin-top: 0px;
	margin-bottom: 30px; */
}

.progress-container-inner {
  width: 0%;
  height: 8px;
  background-color: #ff830a;
}
</style>
