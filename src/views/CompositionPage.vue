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
                  'has-background-grey-lighter': marca === nombreMarca
                }"
              >
                <img :src="marca" />
              </figure>
            </a>
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
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import gravityCombo from "../components/GravityCombo";

export default {
  components: {
    gravityCombo,
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: "/api/uploads/composition"
      },
      images: [],
      marcas: [
        "/images/marca1.png",
        "/images/marca2.png",
        "/images/marca3.png",
        "/images/marca4.png",
        "/images/marca5.png",
        "/images/marca5.svg"
      ],
      nombreMarca: "/images/marca1.png",
      repetir: false,
      ubicacion: "center",
      texto: ""
    };
  },
  methods: {
    onFileSuccess(file, response) {
      this.images.push(response);
    },
    sendingEvent(file, xhr, formData) {
      formData.append("waterMarkFileName", this.nombreMarca);
      formData.append("gravity", this.ubicacion);
      formData.append("text", this.texto);
      formData.append("tile", this.repetir);
    }
  }
};
</script>

<style></style>
