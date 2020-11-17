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
#app {
    background-color: #004D40
}
</style>
