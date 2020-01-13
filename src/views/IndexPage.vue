<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <h1 class="is-size-5">Index Page</h1>
        <button class="button" @click="testApi">Test api</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    testApi() {
      this.$http.get("/api").then(resp => {
        console.log(resp.data);
      });
    }
  }
};
</script>

<style></style>
