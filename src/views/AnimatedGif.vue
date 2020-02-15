<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <vueDropzone
          :options="dropzoneOptions"
          @vdropzone-success="onFileSuccess"
        />
      </div>
    </div>
    <div class="columns">
      <div class="column" v-for="image in images" :key="image.path">
        <figure class="image">
          <img :src="`/images/${image.path}`" alt="" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      images: [],
      dropzoneOptions: {
        url: "/api/uploads/gifs"
      }
    };
  },
  methods: {
    onFileSuccess(file, response) {
      this.images.push(response);
    }
  }
};
</script>

<style></style>
