<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <vueDropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          @vdropzone-success="onFileSuccess"
        />
      </div>
    </div>
    <div class="container" v-if="responses.length > 0">
      <div
        class="columns is-multiline"
        v-for="response in responses"
        :key="response.key"
      >
        <div
          class="column is-3-desktop"
          v-for="image in response.images"
          :key="image.fileName"
        >
          <picture>
            <source
              :srcset="`/images/${image.fileName}`"
              :type="`image/${image.format}`"
            />
            <img :src="`/images/nosoportado.png`" alt="" />
          </picture>
          <div>
            <b>{{ image.format }}</b>
          </div>
        </div>
        <div class="column is-12">
          <chart-formats :data="response.images"></chart-formats>
        </div>
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
      dropzoneOptions: {
        url: '/api/uploads',
      },
      responses: [],
    }
  },
  methods: {
    onFileSuccess(file, response) {
      // console.log('success', response)
      this.responses.unshift({
        key: +new Date(),
        images: response,
      })
    },
  },
}
</script>

<style></style>
