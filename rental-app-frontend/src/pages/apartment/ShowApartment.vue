<template>
  <div>
    <section class="section section-sm">
      <div class="container">
        <!--  PICTURE GALLERY -->
        <picture-gallery :show="showPictureGallery" title="Apartment Images" fixed>
          <div>
            <span class="pic-navi-close d-flex justify-content-end" @click="closePicture()"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3px; overflow: visible;" aria-hidden="true" role="presentation" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg></span>
          </div>
          <div class="d-flex justify-content-center">
            <img class="mt-3 img-fluid" v-bind:src="currentImage" />
          </div>

          <div class="row justify-content-center">
            <button
              class="btn btn-secondary mr-2 pic-navi"
              type="button"
              :disabled="!hasPrevioustPic"
              @click="previousPicture()"
            >
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
                    d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"
                  ></path>
                </g>
              </svg>
            </button>
            <button
              class="btn btn-secondary ml-2 pic-navi"
              type="button"
              :disabled="!hasNextPic"
              @click="nextPicture()"
            >
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
            </button>
          </div>
        </picture-gallery>
        <!--  PICTURE GALLERY -->
        <!--  RESPONSE -->
        <base-dialog :show="showResponse" title="Reservation" fixed>
          <div class="continer d-flex justify-content-center">
            <!--  RESERVATION SUCCESS -->
            <div v-if="!apiError.error" title="Reservation Succeed">
              <img
                alt="Subotica"
                src="../../assets/success.svg"
                width="35"
                hspace="4"
                style="vertical-align: middle"
              />
              Reservation is Successfull
              <p>Thank you for your reservation!</p>
              <div class="centered">
                <base-button type="button" @click="goToPage('listmyreservation')"
                  >Show My Reservations</base-button
                >
              </div>
            </div>
            <!-- / RESERVATION SUCCESS -->
            <!--  RESERVATION ERROR -->
            <div v-else>
              <img
                alt="Subotica"
                src="../../assets/error.svg"
                width="35"
                hspace="4"
                style="vertical-align: middle"
              />
              ERROR in Reservation
              <p>{{ apiError.message }}</p>
              <p>Please try again!</p>
              <base-button type="button" @click="handleError">Close</base-button>
            </div>
            <!--  RESERVATION ERROR -->
          </div>
        </base-dialog>
        <!--  / RESPONSE -->

        <!-- APARTMENT -->
        <!-- APARTMENT DESIGN-->
        <div>
          <h2>{{ item.name }}</h2>

          <!-- Overview from templage-->
          <section class="section section-lg o-small-padding">
            <div class="container">
              <div class="row row-50 justify-content-center justify-content-lg-between">
                <div class="col-md-10 col-lg-6">
                  <p>{{ item.description }}</p>
                  <div class="group group-middle">
                    <a
                      v-if="isLoggedIn"
                      class="button button-primary button-winona white_text"
                      v-on:click="pickDates(item.id)"
                      data-waypoint-to="#our-history"
                      >Reservation</a
                    >
                    <p class="please-login" v-else>For reservation please log in</p>
                    <div class="button button-primary-outline button-winona no_pointer">
                      Price: {{ item.pricePerDay }} EUR
                    </div>
                  </div>
                </div>
                <div class="col-md-10 col-lg-6 text-xl-right">
                  <!-- **************************************** -->
                  <div class="address"></div>
                  <h4>Address:</h4>
                  <h5 class="">{{ item.address }}</h5>
                  <!-- RATING -->
                  <div class="rating">
                    <h3>Ratings</h3>
                    <div></div>
                    <div class="stars offset-2">
                      <star-rating
                        :rating="ratingAvg"
                        :round-start-rating="false"
                        class="star_centered"
                      ></star-rating>
                    </div>
                    <div>
                      <hr />
                      Guest ratings: {{ ratingNum }}
                    </div>
                  </div>
                  <!-- /RATING -->
                  <!-- **************************************** -->
                </div>
              </div>
            </div>
          </section>
          <!-- /Overview from templage-->
          <!-- RESERVATION-->
          <!--  DATE PICKER -->
          <div v-show="showDatePicker" class="reservation">
            <!--  /DATE PICKER -->
            <hr />
            <div class="mb-3">
              <span class="check-date">
                Check In Date:
                {{
                  checkInDate.toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                }}
                -
              </span>
              <span class="check-date">
                Check Out Date:
                {{
                  checkOutDate.toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                }}
              </span>
            </div>
            <hr />
            <div class="d-flex justify-content-center">
              <div>
                <div><span class="align-top mr-2">Check in</span></div>
                <datepicker
                  placeholder="Select Check In Date"
                  v-model="checkInDate"
                  @update:modelValue="dateSelected"
                  @selected="myFunction"
                  :disabled-dates="{ to: today, dates: reservedDays }"
                  calendar-class="date_picker"
                  :prevent-disable-date-selectiona="true"
                ></datepicker>
              </div>
              <div class="col-md-1"></div>
              <div>
                <div><span class="align-top mr-2">Check out</span></div>
                <datepicker
                  placeholder="Select Check Out Date"
                  v-model="checkOutDate"
                  @update:modelValue="dateSelected"
                  @selected="myFunction"
                  :disabled-dates="{ to: today, dates: reservedDays }"
                  calendar-class="date_picker"
                  :prevent-disable-date-selectiona="true"
                ></datepicker>
              </div>
            </div>
            <div class="centered mt-3">
              <base-button class="mr-2" type="button" @click="makeReservation(item.id)"
                >Save</base-button
              >
              <base-button class="ml-2" type="button" @click="cancelReservation(item.id)"
                >Cancel</base-button
              >
            </div>
          </div>
          <!-- /DATE PICKER -->
          <!-- /RESERVATION-->

          <section class="section section-lg text-center o-small-padding">
            <div>
              <!-- Amenities  and Google Map-->
              <section class="section section-lg o-small-padding">
                <div class="container">
                  <div
                    class="row row-50 justify-content-center justify-content-lg-between"
                  >
                    <div class="col-md-3 text-xl-left text-sm-left">
                      <h3>Amenities</h3>
                      <div v-for="item in item.amenities" :key="item.id">
                        <img
                          src="../../assets/images/am_0.svg"
                          width="33"
                          hspace="14"
                          vspace="2"
                        />
                        <span class="am_type"> {{ item.type }}:</span>
                        <span class="am_value"> {{ item.value }}</span>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <h3>Location</h3>
                      <GoogleMapsComponent v-if="address" :address="address" />
                    </div>
                  </div>
                </div>
              </section>
              <!-- /Amenities  and Google Map-->

              <!-- NEW IMAGE SET -->
              <section>
                <div class="pic_gal mt-5 mb-3">
                  <h4>Gallery</h4>
                  <div
                    v-if="item?.images?.length > 0"
                    class="row row-x-10 justify-content-center mt-3"
                    data-lightgallery="group"
                  >
                    <div
                      v-for="(item, index) in item.images"
                      :key="item.id"
                      class="col-3 col-sm-4 col-md-3 pic-ponter"
                    >
                      <a class="thumbnail-minimal" @click="showPicture(index)">
                        <img
                          class="thumbnail-minimal-image"
                          v-bind:src="`${apiUrl}/${item.path}`"
                          alt=""
                        />
                        <div class="thumbnail-minimal-caption"></div>
                      </a>
                    </div>
                  </div>
                  <h5 v-else>There are no images</h5>
                </div>
              </section>
              <!-- /NEW IMAGE SET -->
              <hr />
            </div>
          </section>
          <!-- Counters-->
          <section class="section section-lg text-center o-small-padding">
            <div class="row row-50">
              <div class="col-6 col-md-3">
                <!-- Counter Minimal-->
                <article class="counter-minimal">
                  <div class="counter-minimal-icon linearicons-license"></div>
                  <div class="counter-minimal-main">
                    <div class="counter">{{ item?.rooms }}</div>
                  </div>
                  <h5 class="counter-minimal-title">Number or rooms</h5>
                </article>
              </div>
              <div class="col-6 col-md-3">
                <!-- Counter Minimal-->
                <article class="counter-minimal">
                  <div class="counter-minimal-icon linearicons-sun"></div>
                  <div class="counter-minimal-main">
                    <div class="counter">{{ item?.amenities?.length ?? 0 }}</div>
                  </div>
                  <h5 class="counter-minimal-title">Amenities</h5>
                </article>
              </div>
              <div class="col-6 col-md-3">
                <!-- Counter Minimal-->
                <article class="counter-minimal">
                  <div class="counter-minimal-icon linearicons-star"></div>
                  <div class="counter-minimal-main">
                    <div class="counter">{{ ratingAvg }}</div>
                  </div>
                  <h5 class="counter-minimal-title">Rating</h5>
                </article>
              </div>
              <div class="col-6 col-md-3">
                <!-- Counter Minimal-->
                <article class="counter-minimal">
                  <div class="counter-minimal-icon linearicons-user"></div>
                  <div class="counter-minimal-main">
                    <div class="counter">{{ item?.reservations?.length ?? 0 }}</div>
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

        <!-- /APARTMENT DESIGN-->

        <!-- /APARTMENT -->
        <div class="text-right mt-2">
          <h5>Contact: {{ item?.user?.email }}</h5>
        </div>
        <!-- <hr> -->

        <!-- COMMENTS -->
        <h3>Reviews</h3>
        <div v-if="comments?.length > 0">
          <div v-for="item in comments" :key="item.id" class="comment">
            <div>{{ item.text }}</div>
            <br />
            <div class="comment_date">
              {{ Date(item.createdAt.substring(0, 10)).substring(0, 15) }} -
              <i>Guest:</i> {{ item.user.username }}
            </div>
          </div>
        </div>
        <div v-else class="ml-1">
          <h5>There are no comments</h5>
        </div>
        <!-- /COMMENTS -->
      </div>
    </section>
  </div>
</template>

<script>
import GoogleMapsComponent from "../../components/map/GoogleMapsComponent";
import { Client } from "../../../api/client";
const client = Client.getInstance();
const siteUrl = process.env.VUE_APP_SITE_URL;

export default {
  components: { GoogleMapsComponent },
  data() {
    return {
      currentImage: "",
      currentImageIndex: 0,
      showPictureGallery: false,
      apiUrl: "",
      showResponse: false,
      images: [],
      reservationButtonTitle: "Make a reservation!",
      showDatePicker: false,
      dateSelected: new Date(),
      checkInDate: new Date(),
      checkOutDate: new Date(),
      from: new Date(2021, 1, 7),
      to: new Date(2021, 1, 5),
      today: new Date(),
      blocked: [new Date(2021, 1, 20), new Date(2021, 1, 27)],
      amenities: 0,
      address: "",
    };
  },
  mounted() {
    this.scrollTop();
    document.getElementById("nfp").style.display = "block";
    document.getElementById("fp").style.display = "none";
    const payload = this.$route.params.id;
    this.$store.dispatch("apartment/loadItem", payload);
    this.$store.dispatch("apartment/loadComments", payload);
    this.$store.dispatch("apartment/loadReservedDays", payload);
    this.$store.dispatch("apartment/loadRating", payload);
    this.setImages();
  },
  created() {
    this.apiUrl = process.env.VUE_APP_API_URL;
    try {
      client.get(`apartment/${this.$route.params.id}`).then((data) => {
        this.address = data.data.address;
      });
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    hasNextPic() {
      return this.currentImageIndex < this.item.images.length - 1 ? true : false;
    },
    hasPrevioustPic() {
      return this.currentImageIndex == 0 ? false : true;
    },
    item() {
      return this.$store.getters["apartment/item"];
    },
    comments() {
      return this.$store.getters["apartment/comments"];
    },
    ratingAvg() {
      return Number(this.$store.getters["apartment/ratingAvg"]);
    },
    ratingNum() {
      return this.$store.getters["apartment/ratingNum"];
    },
    apiError() {
      return this.$store.getters["apartment/apiError"];
    },
    reservedDays() {
      return this.$store.getters["apartment/reservedDays"];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    showPicture(i) {
      var numberOfPictures = this.item.images.length;
      this.currentImageIndex = i;
      this.currentImage = `${this.apiUrl}/${this.item.images[i].path}`;
      this.showPictureGallery = true;
    },
    closePicture(i) {
      this.showPictureGallery = false;
    },
    nextPicture() {
      var numberOfPictures = this.item.images.length;
      var i = this.currentImageIndex + 1;
      this.currentImageIndex = i;
      this.currentImage = `${this.apiUrl}/${this.item.images[i].path}`;
    },
    previousPicture() {
      var numberOfPictures = this.item.images.length;
      var i = this.currentImageIndex - 1;
      this.currentImageIndex = i;
      this.currentImage = `${this.apiUrl}/${this.item.images[i].path}`;
    },

    myFunction(id) {
      this.checkOutDate = this.checkInDate;
    },
    cancelReservation(id) {
      this.showDatePicker = false;
    },
    pickDates(id) {
      this.showDatePicker = true;
      this.reservationButtonTitle = "Save";
    },
    editApartment(id) {
      this.$router.push({ path: `/editapartment/${id}` });
    },
    setImages() {
      var item = this.$store.getters["apartment/item"];
      this.images = item.images;
    },
    makeReservation(id) {
      this.success = false;
      this.$store.commit("apartment/setApiError", { error: false, message: "" });
      const actionPayload = {
        startDate: this.checkInDate,
        endDate: this.checkOutDate,
        apartmentId: id,
      };

      try {
        this.$store.dispatch("apartment/createReservation", actionPayload);
        this.$store.commit("apartment/setApiError", { error: false, message: "" });
      } catch (err) {
        this.$store.commit("apartment/setApiError", {
          error: true,
          message: "Reservation failed, please try later.",
        });
      }
      this.$store.commit("apartment/setApiError", { error: false, message: "" });
      this.showResponse = true;
    },

    goToPage(router, id) {
      if (id > 0) {
        this.$router.push({ path: `/${router}/${id}` });
      } else {
        this.$router.push({ path: `/${router}` });
      }
    },
    handleError() {
      this.$store.commit("apartment/setApiError", { error: false, message: "" });
      this.showResponse = false;
    },
    scrollTop() {
      window.scrollTo(0, 0);
    },
  }, // end of methods
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
.picture_list {
  margin: auto;
  width: 50%;
  padding: 10px;
}
.img-container-block {
  text-align: center;
}
.img-container-inline {
  text-align: center;
  display: block;
}
.centered {
  text-align: center;
  display: block;
}
.reservation {
  text-align: center;
  display: block;
  border: 2px solid #cee5f5;
  border-radius: 12px;
  padding: 1rem;
  background-color: #e8f4fc;
}
.success {
  text-align: center;
  margin: 1rem 0;
  border: 2px solid #cee5f5;
  border-radius: 12px;
  padding: 1rem;
  background-color: #e8f4fc;
}
.comment {
  margin: 1rem 0;
  border: 2px solid #cee5f5;
  border-radius: 5px;
  padding: 1rem;
  background-color: #e8f4fc;
}
.rating {
  margin: rem 0;
  border: 2px solid #a7dbfc;
  border-radius: 12px;
  padding: 0.5rem;
  background-color: #d5e9f5;
  text-align: center;
  font-size: 20px;
}
.comment_date {
  color: #888;
}
.star_centered {
  margin: auto;
  width: 50%;
}
.apartment-image {
  width: 90%;
  margin: 10px;
  border-radius: 5px;
}
.address {
  font-size: 25px;
}
.gmap {
  font-size: 25px;
}
.o-small-padding {
  padding: 20px;
}
.am_type {
  font-family: "Verdana", sans-serif;
  font-size: 18px;
  font-weight: normal;
}
.am_value {
  color: #400;
  font-size: 18px;
}
.google_map {
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ff862d;
}
.no_pointer {
  cursor: default;
}
.stars {
  width: 40%;
}
.check-date {
  font-weight: 550;
}
.please-login {
  background-color: #f8d7da;
  padding: 10px;
  padding-right: 12px;
  padding-left: 12px;
  border: 1px solid #ddd;
  border: #972124 solid 1px;
  border-radius: 5px;
  color: #972124;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}
.pic_gal {
  margin-top: 50;
}
.pic-navi {
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: #ff830a;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pic-navi-close {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin-top: 5px;
}
.pic-ponter {
  cursor: pointer;
}
</style>
