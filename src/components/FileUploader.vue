<template>
  <dropzone
    ref="myVueDropzone"
    id="dropzone"
    :options="dropzoneOptions"
    @vdropzone-sending="sendingEvent"
    @vdropzone-success="onFileSuccess"
  />
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  props: ['url'],
  components: {
    dropzone: vue2Dropzone,
  },
  data() {
    return {}
  },
  methods: {
    sendingEvent() {},
    onFileSuccess() {},
  },
}
</script>

<style></style>
