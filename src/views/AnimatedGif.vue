<template>
  <div class="container">
    <div class="columns" style="margin-top: 3rem;">
      <div class="column is-6-desktop is-offset-3-desktop">
        <div class="notification is-info">
          Convierte un gif animado en webp y compara tamaños
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <vueDropzone
          :options="dropzoneOptions"
          @vdropzone-success="onFileSuccess"
          id="dropzone"
        />
      </div>
    </div>
    <div class="columns" v-for="(imagePack, idx) in images" :key="idx">
      <div class="column" v-for="image in imagePack" :key="image.fileName">
        <figure class="image">
          <img :src="`/images/${image.fileName}`" alt="" />
        </figure>
        <div>
          <b>{{ image.format }}</b> {{ image.size }} bytes
        </div>
      </div>
      <div class="column">
        <chart-formats :data="imagePack" />
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import ChartFormats from '@/components/ChartFormats.vue'

export default {
  components: {
    ChartFormats,
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      images: [],
      dropzoneOptions: {
        url: '/api/uploads/gifs',
      },
    }
  },
  methods: {
    onFileSuccess(file, response) {
      this.images.push(response)
    },
  },
}
</script>

<style></style>
