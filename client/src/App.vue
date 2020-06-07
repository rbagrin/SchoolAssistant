<template>
  <v-app id="app" class="grey">
    <Navbar />
    <v-content class="mx-4 mt-5 mb-3">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
    name: "App",
    components: {
        Navbar
    },
    data: () => ({

    })
};
</script>

<style>
/* #app {
  background-image: url('https://cdn.pixabay.com/photo/2017/12/28/12/31/sketch-3045125_960_720.jpg')
  background: url('../public/doodle2.jpg') no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  overflow: hidden;
} */
#app {
    background-color: #004D40
}
</style>
