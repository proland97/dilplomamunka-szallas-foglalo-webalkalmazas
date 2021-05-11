<template>
  <div>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <section class="section section-sm">
      <div class="container">
        <br />
        <h1>Register your apartment now!</h1>

        <div v-show="formSubmited" class="from_database">
          <h2>ID: {{ idCreated }}</h2>
          <h2>Name: {{ itemFromDatabase.name }}</h2>
          <p>Address: {{ itemFromDatabase.address }}</p>
          <i>Description: {{ itemFromDatabase.description }}</i>
          <p>Rooms: {{ itemFromDatabase.rooms }}</p>
          <p>Price: {{ itemFromDatabase.pricePerDay }}</p>

          <p>Price: {{ itemFromDatabase.pricePerDay }}</p>
          <hr />
          <h3>Amenities</h3>
          <span v-for="item in itemFromDatabase.amenities" :key="item.id">
            {{ item.type }}: {{ item.value }} |
          </span>
          <hr />
          <div class="img-container-block">
            <div v-for="item in itemFromDatabase.images" :key="item.id" class="item">
              <div>
                <img
                  v-bind:src="`${apiUrl}/${item.path}`"
                  class="item_image"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-show="formSubmited">
          <p v-show="apiError.error">
            <img
              alt="Subotica"
              src="../../assets/error.svg"
              width="35"
              hspace="4"
              style="vertical-align: middle"
            />
            {{ apiError.message }}
          </p>
        </div>

        <!-- FORM -->
        <form v-show="!formSubmited" @submit.prevent="submitForm">
          <div class="form-control" :class="{ invalid: !apartmentName.isValid }">
            <label for="firstname">Name of the Apartment</label>
            <input
              type="text"
              id="firstname"
              placeholder="Name..."
              v-model.trim="apartmentName.val"
              @blur="clearValidity('apartmentName')"
            />
            <p v-if="!apartmentName.isValid">
              <img
                alt="Subotica"
                src="../../assets/error.svg"
                width="35"
                hspace="4"
                style="vertical-align: middle"
              />Name must not be empty.
            </p>
          </div>
          <div class="form-control" :class="{ invalid: !description.isValid }">
            <label for="description">Description</label>
            <textarea
              id="description"
              rows="5"
              placeholder="Description..."
              v-model.trim="description.val"
              @blur="clearValidity('description')"
            ></textarea>
            <p v-if="!description.isValid">
              <img
                alt="Subotica"
                src="../../assets/error.svg"
                width="35"
                hspace="4"
                style="vertical-align: middle"
              />Description must not be empty.
            </p>
          </div>
          <div class="form-control" :class="{ invalid: !address.isValid }">
            <label for="lastname">Address</label>
            <input
              type="text"
              id="lastname"
              placeholder="Adress..."
              v-model.trim="address.val"
              @blur="clearValidity('address')"
            />
            <p v-if="!address.isValid">
              <img
                alt="Subotica"
                src="../../assets/error.svg"
                width="35"
                hspace="4"
                style="vertical-align: middle"
              />Address must not be empty.
            </p>
          </div>
          <div class="form-control" :class="{ invalid: !pricePerDay.isValid }">
            <label for="pricePerDay">Daily Price</label>
            <div class="d-flex">
              <input
			  	style="width: 100px"
                type="number"
                id="pricePerDay"
                v-model.number="pricePerDay.val"
                @blur="clearValidity('pricePerDay')"
              />
              <span class="input-group-text ml-2">€ Euro</span>
            </div>
            <p v-if="!pricePerDay.isValid">
              <img
                alt="Subotica"
                src="../../assets/error.svg"
                width="35"
                hspace="4"
                style="vertical-align: middle"
              />Rate must be greater than 0.
            </p>
          </div>
          <div class="form-control" :class="{ invalid: !numberOfRooms.isValid }">
            <label for="numberOfRooms">Number of rooms</label>
            <input
              type="number"
              id="numberOfRooms"
              v-model.number="numberOfRooms.val"
              @blur="clearValidity('numberOfRooms')"
            />
            <p v-if="!numberOfRooms.isValid">
              <img
                alt="Subotica"
                src="../../assets/error.svg"
                width="35"
                hspace="4"
                style="vertical-align: middle"
              />Number of rooms must be greater than 0.
            </p>
          </div>
          <!-- / FORM -->
          <!--  AMENITIES -->

          <div class="amenities">
            <h2>Amenities</h2>
            <div class="row justify-content-center mt-1">
              <div>
                <div
                  v-for="(item, index) in defaultAmenities"
                  class="form-group form-inline mt-3"
				  :key="item"
                >
                  <base-button
                    v-if="index > 0"
                    type="button"
                    class="red_button"
                    @click="deleteAmenitie(index)"
                    >Delete</base-button
                  >
                  <div
                    v-else
                    type="button"
                    class="red_button_placeholder"
                    @click="deleteAmenitie(index)"
                  ></div>

                  <input
                    class="ml-2"
                    name="item.name"
                    v-model="item.amount"
                    type="number"
                    size="3"
                    min="1"
                    max="99"
                  />
                  <label class="mt-1">&nbsp; {{ item.key }}</label>
                </div>
              </div>
            </div>

            <div class="centered">
              <base-button
                type="button"
                class="new_amenitie mt-3"
                @click="showNewAmenitieDialog"
                >{{ showNewAmenitie ? "Cancel" : "Add new amenitie" }}</base-button
              >
            </div>

            <div v-show="showNewAmenitie">
              <br />
              <p>
                In case you want to add new amenities, please enter your new amenitie.<br />Foram
                example Name: "Bicycle" Value: "3"
              </p>
              <div class="row justify-content-center">
                <span class="add_am">Name:</span>
                <input
                  name="newAmenitieKey"
                  v-model="newAmenitieKey"
                  type="text"
                  size="1"
                  class="am_name"
                />
                <span class="add_am">Value:</span>
                <input
                  name="newAmenitieValue"
                  v-model="newAmenitieValue"
                  type="number"
                  size="3"
                  min="1"
                  max="99"
                />
                <br />
                <base-button type="button" @click="addNewAmenitie" class="new_amenitie"
                  >Add</base-button
                >
              </div>
            </div>
          </div>
          <!--  / AMENITIES -->

            <div class="mt-5 mb-3 col-sm-8 m-auto" v-if="isModelLoading">
                <strong class="d-flex justify-content-center mb-2">Model is loading please wait</strong>
                  <div class="progress">
                      <div class="progress-bar progress-bar-striped progress-bar-animated custom-progress" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
            </div>

            <div class="mt-5 mb-5 col-sm-8 m-auto" v-if="isModelDetecting">
                <strong class="d-flex justify-content-center mb-2">Model is detecting please wait</strong>
                <div class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated custom-progress" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>

            <div class="error-container" role="alert" v-if="detectionErrors?.length > 0">
              <h4 class="error mb-2">Please upload a picture of the items below</h4>
              <ul>
                <li v-for="error in detectionErrors" :key="error"><strong class="error">{{error.key}}: {{error.missing}} missing</strong></li>
              </ul>
            </div>

          <p class="error-container error mb-3" v-if="!formIsValid">Please fix the above errors and submit again.</p>

          <!--  FILE UPLOAD -->
          <div v-show="showFileUpload">
            <h2>File Upload</h2>
            Please select your pictures to upload. You can upload up to 10
            <i>jpg, jpeg</i> or <i>png</i> pictures, sized up to 5 MB each.
            <h2 class="ai mt-1 mb-2">
              Our built in Airtifcial Inteligence System will recognize the corelation
              between checked amenities and your uploaded pictures. For example, if you
              have checkd TV in amenities, please uplaod at least one picture of your
              apartment with television on it.
            </h2>
            <ul>
              <li v-for="item in selectedFilesDescriptions" :key="item">
                File name: {{ item.name }}, size: {{ item.size }} Bytes
              </li>
            </ul>
            <div class="d-flex justify-content-center mt-3">
              <input
                style="display: none"
                type="file"
                @change="onFileSelected"
                ref="fileInput"
                multiple
              />
              <base-button
                class="upload_files"
                type="button"
                @click="$refs.fileInput.click()"
                >Select File(s) to Upload</base-button
              >
              <base-button class="ml-3">Register</base-button>
            </div>

            </div>


          <!--  / FILE UPLOAD -->
        </form>
      </div>
      <img style="display: none" id="imgtodetect" src="" alt="" />
    </section>
  </div>
</template>

<script>
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
let images;
let net;
let reader;
const objectsToDetect = ['bench', 'cat', 'dog', 'chair', 'couch', 'bed', 'tv', 'microwave', 'owen', 'toaster', 'refrigerator', ] //todo kiegészíteni

const detectimage = (file) => {
  return new Promise((resolve, reject) => {
    reader = new FileReader();
    reader.onload = async function (e) {
      let img = document.getElementById("imgtodetect");
      img.src = e.target.result;
      img.onload = async () => {
        try {
          let obj = await net.detect(img);
          resolve(obj);
        } catch (e) {
          reject(e);
        }
      };
    };
    reader.readAsDataURL(file);
  });
};

const detectAll = async () => {
  return new Promise(async (resolve, reject) => {
    if (!images || images.length == 0) {
      reject(new Error("No images"));
      return;
    }
    let objects = [];
    for (let i = 0; i < images.length; i++) {
      try {
        let objs = await detectimage(images[i]);
        objs.forEach((obj) => {
          objects.push({ class: obj.class, score: obj.score });
        });
      } catch (e) {
        reject(e);
      }
    }
    resolve(objects);
  });
};

const countObjects = (objArray) => {
  let set = {};
  objArray.forEach((obj) => {
    if (obj.score >= 0.6) {
      if (set[obj.class] == undefined) {
        set[obj.class] = 1;
      } else {
        set[obj.class]++;
      }
    }
  });
  return set;
};

export default {
  data() {
    return {
      filePayload: null,
      apartmentName: { val: "", isValid: true },
      address: { val: "", isValid: true },
      description: { val: "", isValid: true },
      pricePerDay: { val: 12, isValid: true },
      numberOfRooms: { val: 4, isValid: true },
      selectedFile: null,
      selectedFiles: [],
      selectedFilesDescriptions: [],
      formIsValid: true,
      formSubmited: false,
      isLoading: false,
      showSuccess: false,
      showFileUpload: true,
      error: this.$store.getters["apiError"],
      errorMessage: "",
      defaultAmenities: [
        { key: "Bed", amount: "2" },
        { key: "TV", amount: "1" },
        { key: "Microwave", amount: "1" },
        { key: "Refrigerator", amount: "1" },
      ],
      showNewAmenitie: false,
      newAmenitieKey: "",
      newAmenitieValue: null,
      newAmenitieButonTitle: "Add New Amenitie",
      detectionErrors: [],
      isModelLoading: true,
      isModelDetecting: false,
      apiUrl: ''
    };
  },
  computed: {
    apiError() {
      return this.$store.getters["apartment/apiError"];
    },
    idCreated() {
      return this.$store.getters["apartment/idCreated"];
    },
    itemFromDatabase() {
      return this.$store.getters["apartment/itemFromDatabase"];
    },
  },
  mounted() {
    document.getElementById("nfp").style.display = "none";
    document.getElementById("fp").style.display = "none";
  },
  async beforeCreate() {
	  net = await cocossd.load({ base: "lite_mobilenet_v2" });
    console.log("Model ready for detection!");
    this.isModelLoading = false;
  },
  created() {
    this.apiUrl = process.env.VUE_APP_API_URL;
  },
  methods: {
    async useDetections() {
      try {
        this.isModelDetecting = true;
        let objects = await detectAll();
        this.isModelDetecting = false;
        return countObjects(objects)
      } catch (error) {
        console.log(error.message);
        this.isModelDetecting = false;
        return {}
      }
    },
    async storeFiles(event) {
      let err;
      const imageTypes = ["image/jpeg", "image/jpg", "image/png"];
      event.target.files.forEach((file) => {
        if (!imageTypes.includes(file.type)) err = "Extensions is not enabled";
      });
      if (err) {
        console.log(err);
        return;
      }
      images = event.target.files;
    },
    showNewAmenitieDialog() {
      this.showNewAmenitie = !this.showNewAmenitie;
    },
    addNewAmenitie() {
      const a = `{ "key": "${this.newAmenitieKey}", "amount": ${this.newAmenitieValue} }`;
      const o = JSON.parse(a);
      this.defaultAmenities.push(o);
      this.showNewAmenitie = !this.showNewAmenitie;
      this.newAmenitieKey = "";
      this.newAmenitieValue = "";
    },
    composeAmenities() {
      const oldAmenities = this.defaultAmenities;
      var a = "{";
      const newAmenities = oldAmenities.forEach((item) => {
        var line = '"' + item.key + '":' + item.amount + ",";
        a = a + line;
      });
      a = a.slice(0, -1) + "}";
      const obj = JSON.parse(a);
      return obj;
    },
    goToMyApartments() {
      this.$router.replace("listmyapartment");
    },
    deleteAmenitie(i) {
      this.defaultAmenities.splice(i, 1);
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.apartmentName.val === "") {
        this.apartmentName.isValid = false;
        this.formIsValid = false;
      }
      if (this.address.val === "") {
        this.address.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.pricePerDay.val || this.pricePerDay.val < 0) {
        this.pricePerDay.isValid = false;
        this.formIsValid = false;
      }
      if (!this.numberOfRooms.val || this.numberOfRooms.val < 0) {
        this.numberOfRooms.isValid = false;
        this.formIsValid = false;
      }
    },

    async submitForm() {
      this.detectionErrors = []
      this.validateForm();

      const objects = await this.useDetections();
      const amenities = this.composeAmenities();

      for (const [pureKey, value] of Object.entries(amenities)) {
        let key = pureKey.trim().toLowerCase();
        if (objectsToDetect.includes(key)) {
          if (objects[key] !== value){
            const missing = value - (objects[key] ?? 0)
            if (missing < 1) { 
              continue;
            }
            this.detectionErrors.push({key, missing})
            this.formIsValid = false;
          }
        }
      }

      if (!this.formIsValid) {
        return;
      } else {
        this.formSubmited = true;
      }
      
      const dataPayload = {
        name: this.apartmentName.val,
        description: this.description.val,
        rooms: this.numberOfRooms.val,
        pricePerDay: this.pricePerDay.val,
        address: this.address.val,
        amenities: amenities,
      };
      const filePayload = this.filePayload;
      const payload = [dataPayload, filePayload];

      try {
        let a = await this.$store.dispatch("apartment/createItemNew", payload);
        //await myfunc() { }
        const idx = this.$store.getters["apartment/idCreated"];
        this.showSuccess = true;
        this.showFileUpload = true;
        this.$router.replace("listmyapartment");
      } catch (err) {
        this.error = err.message || "Failed to register an apartment, please try later.";
      }
      this.error = this.$store.getters["apartment/apiError"];
      this.isLoading = false;
    },

    handleError() {
      this.error = null;
    },

    //File upload

    onFileSelected(event) {
      this.storeFiles(event)
      this.showSuccess = false;
      this.selectedFiles = event.target.files;
      this.selectedFile = event.target.files[0];
      var selectedFilesDesc = [];
      this.selectedFiles.forEach((item) => {
        selectedFilesDesc.push({ name: item.name, size: item.size });
      });
      this.selectedFilesDescriptions = selectedFilesDesc;

      var formData = new FormData();
      this.selectedFiles.forEach((item) => {
        formData.append("apartmentImage", item, item.name);
      });
      this.filePayload = formData;
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
  border: none;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}
input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}
input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}
input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}
h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}
.invalid label {
  color: red;
}
.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.from_database {
  margin: 1rem 0;
  border: 2px solid #cee5f5;
  border-radius: 5px;
  padding: 1rem;
  background-color: #e8f4fc;
}
.success {
  text-align: center;
  margin: 1rem 0;
  border: 2px solid #cee5f5;
  border-radius: 5px;
  padding: 1rem;
  background-color: #e8f4fc;
}
.img-container-block {
  text-align: center;
}
.img-container-inline {
  text-align: center;
  display: block;
}
.item_image {
  max-width: 100%;
  max-height: 100%;
}
input[type="number"] {
  width: 50px;
}
.amenities {
  margin: 1rem 0;
  border: 2px solid #cee5f5;
  border-radius: 5px;
  padding: 1rem;
  background-color: #e8f4fc;
  padding: 0 4px 0 6px;
}
span {
  display: table-cell;
  padding: 0 4px 0 6px;
}
/*inline form*/

.form-inline {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.form-inline label {
  margin: 20px 10px 5px 0;
  font-weight: normal;
}

.form-inline input {
  vertical-align: middle;
  margin: 2px 1px 1px 0;
  padding: 2px;
  background-color: #fff;
  width: 90px;
  border: 1px solid #ddd;
}
@media (max-width: 800px) {
  .form-inline input {
    margin: 10px 0;
  }
  .form-inline {
    flex-direction: column;
    align-items: stretch;
  }
}
.centered {
  text-align: center;
  display: block;
  margin: 10px 0 10px 0;
}
.new_amenitie {
  background-color: #25809c;
  padding: 4px;
  padding-left: 0px;
  padding-right: 0px;
  width: 150px;
}
.upload_files {
  background-color: #25809c;
}
.red_button {
  background-color: #cc0000;
  width: 100px;
  padding: 3px;
}

.red_button_placeholder {
  width: 110px;
}
.am_name {
  width: 140px;
}
.add_am {
  padding-top: 10px;
}
.ai {
  background-color: #ff832b;
  padding: 10px;
  border: 1px solid #ddd;
  border: #ab5519 solid 1px;
  border-radius: 5px;
  color: white;
  font-size: 25px;
  text-align: center;
}
.error {
  color: #a94442;
}
.error-container {
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 4px;
}
.custom-progress {
  background-color:#ff830a;
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
