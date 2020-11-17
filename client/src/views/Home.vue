<template>
    <div class="home">
        <v-row height="100%" justify="space-between">
            <v-col cols="12" md="3">
                <Tasks :tasks="allTasks" />
            </v-col>
            <v-col>
                <News :news="allNews" />
            </v-col>
            <v-col cols="12" md="3">
                <Utils />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import News from "@/components/News";
import Utils from "@/components/Utils";
import Tasks from "@/components/Tasks";

export default {
    name: "Home",
    components: {
        News,
        Utils,
        Tasks
    },
    created() {
        this.$store.dispatch('getTasksFromDB');
        this.$store.dispatch('getNewsFromDB');
    },
    computed: {
        allTasks: function () {
            return this.$store.getters.tasks;
        },
        allNews: function () {
            return this.$store.getters.news;
        }
    }
};
</script>

<style scoped>
.home {
    height: 100%;
}
</style>