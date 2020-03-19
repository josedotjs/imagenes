<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div>
          <verte v-model="color" />
        </div>
        <vueDropzone
          id="dropzone"
          :options="dropzoneOptions"
          @vdropzone-success="onFileSuccess"
          @vdropzone-sending="sendingEvent"
        />
      </div>
    </div>
    <div class="columns">
      <div
        class="column is-4-desktop is-6-tablet"
        v-for="image in images"
        :key="image"
      >
        <picture>
          <source :srcset="`/images/${image}`" type="image/webp" />
          <img :src="`/images/nosoportado.png`" alt="" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Verte from 'verte'
import 'verte/dist/verte.css'

export default {
  components: {
    Verte,
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      color: 'white',
      images: [],
      dropzoneOptions: {
        url: '/api/uploads/color',
      },
    }
  },
  methods: {
    sendingEvent(file, xhr, formData) {
      formData.append('color', this.color)
    },
    onFileSuccess(file, response) {
      this.images = response
    },
  },
}
</script>

<style></style>
