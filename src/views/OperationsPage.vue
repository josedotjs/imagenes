<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <vue2Dropzone
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            @vdropzone-sending="sendingEvent"
            @vdropzone-success="onFileSuccess"
          />
        </div>
      </div>
      <div class="columns is-multiline">
        <div
          class="column is-3-desktop is-6-tablet"
          v-for="file in files"
          :key="file"
        >
          <figure>
            <img :src="`/images/${file.file}`" alt="" />
          </figure>
          <div>
            <b>{{ file.operationName }}</b>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: {
    vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: '/api/uploads/operations',
      },
      files: [],
    }
  },
  methods: {
    sendingEvent() {},
    onFileSuccess(file, response) {
      this.files = response
    },
  },
}
</script>

<style></style>
