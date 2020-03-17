<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div>
          <verte v-model="color" />
        </div>
        <vueDropzone
          :options="dropzoneOptions"
          @vdropzone-success="onFileSuccess"
          @vdropzone-sending="sendingEvent"
        />
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
  },
}
</script>

<style></style>
