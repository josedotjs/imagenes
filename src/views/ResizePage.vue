<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="form">
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <label for="" class="label is-small">Ancho</label>
              <input
                class="input"
                type="number"
                min="200"
                max="2000"
                step="10"
                v-model="width"
              />
            </div>
            <div class="control">
              <label for="" class="label is-small">Alto</label>
              <input
                class="input"
                type="number"
                min="200"
                max="2000"
                step="10"
                v-model="height"
              />
            </div>
            <div class="control">
              <label for="" class="label is-small">Color fondo</label>
              <!-- <input type="color" class="input" v-model="color" /> -->
              <Verte v-model="color" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="section">
        <div class="field is-grouped is-grouped-centered"></div>
      </div>
      <div class="column">
        <vueDropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          @vdropzone-sending="sendingEvent"
          @vdropzone-success="onFileSuccess"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <verte v-model="backgroundColorImage" />
      </div>
    </div>

    <div class="columns" v-for="imgSet in images" :key="imgSet.id">
      <div
        class="column"
        v-for="image in imgSet"
        :key="image.path"
        :style="{'background-color': backgroundColorImage}"
      >
        <div class="item">
          <figure class="image">
            <img :src="`/images/${image.path}`" />
          </figure>
          <div class="footer">
            <div>
              <small>Fit: {{ image.fit }}</small>
            </div>
            <div>
              <small>Width: {{ image.info.width }}</small>
            </div>
            <div>
              <small>Height: {{ image.info.height }}</small>
            </div>
            <div>
              <small>Size: {{ image.info.size }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import Verte from 'verte'
import shortid from 'shortid'
import 'verte/dist/verte.css'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: {
    vueDropzone: vue2Dropzone,
    Verte,
  },
  data() {
    return {
      backgroundColorImage: '#000000',
      images: [],
      width: 600,
      height: 600,
      color: '#000000',
      dropzoneOptions: {
        url: '/api/uploads/resize',
      },
    }
  },
  methods: {
    onFileSuccess(file, response) {
      response.id = shortid.generate()
      this.images.unshift(response)
    },
    onSelectFit(e) {
      this.selectedFit = this.fits.find(f => f.label === e.target.value)
    },
    sendingEvent(file, xhr, formData) {
      formData.append('width', this.width)
      formData.append('height', this.height)
      formData.append('color', this.color)
    },
  },
}
</script>

<style scoped>
.item {
  height: 100%;
}
</style>
