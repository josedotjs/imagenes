<template>
  <div class="container">
    <div class="columns">
      <div class="column is-6-desktop is-offset-3-desktop">
        <div class="notification is-info">
          Crea una imagen con distintos tint
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <verte v-model="backgroundColor" model="rgb" />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <vueDropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          @vdropzone-success="onFileSuccess"
          @vdropzone-sending="sendingEvent"
        />
      </div>
    </div>
    <div class="container">
      <div class="columns is-6-desktop is-offset-3-desktop">
        <div class="column">
          <div class="has-text-centered">
            <verte v-model="testBackgroundColor" model="rgb" />
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div
          class="column is-6-desktop is-offset-3-desktop has-text-centered"
          v-if="image"
          :style="{'background-color': testBackgroundColor}"
        >
          <picture>
            <source :srcset="`/images/${image}`" :type="`image/webp`" />
            <img :src="`/images/nosoportado.png`" alt="" />
          </picture>
        </div>
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
      backgroundColor: 'black',
      dropzoneOptions: {
        url: '/api/uploads/pop',
      },
      image: '',
      testBackgroundColor: 'rbg(255,255,255)',
    }
  },
  methods: {
    onFileSuccess(file, response) {
      // console.log('success', response)
      this.image = response
    },
    sendingEvent(file, xhr, formData) {
      formData.append('backgroundColor', this.backgroundColor)
    },
  },
}
</script>

<style></style>
