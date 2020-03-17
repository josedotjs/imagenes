<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <h1 class="is-size-6">Marca de agua</h1>
        <div class="columns">
          <div class="column " v-for="marca in marcas" :key="marca">
            <a href="#" @click="nombreMarca = marca">
              <figure
                class="image is-64x64 has-text-centered"
                :class="{
                  'has-background-grey-lighter': marca === nombreMarca,
                }"
              >
                <img :src="marca" />
              </figure>
            </a>
          </div>
          <div class="select">
            <select v-model="selectedBlend">
              <option :value="blend" v-for="blend in blends" :key="blend">{{
                blend
              }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column">
        <h1 class="is-size-6">Opciones</h1>
        <div class="columns">
          <div class="column">
            <div class="field is-grouped is-grouped-centered">
              <div class="control">
                <gravity-combo v-model="ubicacion" />
              </div>
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="repetir" />
                  Repetir
                </label>
              </div>
              <div class="control">
                <input
                  type="text"
                  placeholder="Texto"
                  class="input"
                  v-model="texto"
                />
              </div>
              <div class="control">
                <verte v-model="textColor" model="rgb" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
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
    <div class="columns is-multiline">
      <div class="column is-3" v-for="image in images" :key="image">
        <picture>
          <source :srcset="`/images/${image}`" :type="`image/webp`" />
          <img :src="`/images/nosoportado.png`" alt="" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import gravityCombo from '../components/GravityCombo'
import Verte from 'verte'
import 'verte/dist/verte.css'

export default {
  components: {
    gravityCombo,
    Verte,
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      blends: [
        'clear',
        'source',
        'over',
        'in',
        'out',
        'atop',
        'dest',
        'dest-over',
        'dest-in',
        'dest-out',
        'dest-atop',
        'xor',
        'add',
        'saturate',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'colour-dodge',
        'color-dodge',
        'colour-burn',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
      ],
      dropzoneOptions: {
        url: '/api/uploads/composition',
      },
      images: [],
      marcas: [
        '/images/bandera_beerjscba.png',
        '/images/marca2.png',
        '/images/marca3.png',
        '/images/marca4.png',
        '/images/marca5.png',
        '/images/marca5.svg',
      ],
      nombreMarca: '/images/marca1.png',
      repetir: false,
      ubicacion: 'center',
      selectedBlend: 'over',
      texto: '',
      textColor: 'black',
    }
  },
  methods: {
    onFileSuccess(file, response) {
      this.images.push(response)
    },
    sendingEvent(file, xhr, formData) {
      formData.append('waterMarkFileName', this.nombreMarca)
      formData.append('gravity', this.ubicacion)
      formData.append('text', this.texto)
      formData.append('tile', this.repetir)
      formData.append('blend', this.selectedBlend)
      formData.append('textColor', this.textColor)
    },
  },
}
</script>

<style></style>
