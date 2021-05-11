<template>
  <img id="img" alt="test" />
  <button class="btn btn-primary mt-2" @click="detect">Detect</button>
</template>

<script>
import * as cvstfjs from "@microsoft/customvision-tfjs";

export default {
  name: "Custom Vision",
  data() {
    return {
      isLoading: true,
      isDetecting: false,
    };
  },
  methods: {
    async detect() {
      let model = new cvstfjs.ObjectDetectionModel();
      const image = document.getElementById("img");
      await model.loadModelAsync("../model/model.json");
      const result = await model.executeAsync(image);
      console.log(result);
    },
  },
};
</script>
