<template>
<div id="admin">
        <v-row height="100%" justify="space-between">
            <v-col cols="12" md="4">
                <v-list dark>
                    <v-subheader>
                        <v-row justify="space-between">
                            <v-col cols="12" md="3">TASKS</v-col>
                            <v-col cols="12" md="2">
                                <AddTask :tasks="allTasks" />
                            </v-col>
                        </v-row>
                    </v-subheader>
                    <v-list-item-group v-model="task" color="primary" :ripple=false>
                    <v-list-item v-for="(item, i) in allTasks" :key="i" :ripple=false>
                        <v-row justify="space-between">
                            <v-col cols="12" md="2">
                                <EditTask :task="item" />
                            </v-col>
                            <v-col>
                                {{item.title}}
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-chip
                                outlined
                                    small
                                    class="justify-center"
                                    color="green"
                                    text-color="white"
                                    style="font-size: 8px; width: 85px"
                                >
                                    {{item.course}}
                                </v-chip>
                            </v-col>
                            <v-col cols="12" md="2">
                                <v-btn small @click="deleteTask(item)">
                                    <v-icon small color="red">delete</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    
                    </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-col cols="12" md="4">
                <v-list dark>
                    <v-subheader>
                        <v-row justify="space-between">
                            <v-col cols="12" md="3">NEWS</v-col>
                            <v-col cols="12" md="2">
                                <AddNews :news="allNews" />
                            </v-col>
                        </v-row>
                    </v-subheader>
                    <v-list-item-group v-model="news" color="primary" :ripple=false>
                    <v-list-item v-for="(item, i) in allNews" :key="i" :ripple=false>
                        <v-row justify="space-between">
                            <v-col cols="12" md="2">
                                <EditNews :news="item" />
                            </v-col>
                            <v-col>
                                {{item.title}}
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-chip
                                outlined
                                    small
                                    class="justify-center"
                                    color="green"
                                    text-color="white"
                                    style="font-size: 8px; width: 85px"
                                >
                                    {{item.course}}
                                </v-chip>
                            </v-col>
                            <v-col cols="12" md="2">
                                <v-btn small @click="deleteNews(item)">
                                    <v-icon small color="red">delete</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    
                    </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-col cols="12" md="4">
                <v-list dark>
                    <v-subheader>
                        <v-row justify="space-between">
                            <v-col cols="12" md="3">USERS</v-col>
                            <v-col cols="12" md="2">
                                <AddUser :users="allUsers" />
                            </v-col>
                        </v-row>
                    </v-subheader>
                    <v-list-item-group v-model="user" color="primary" :ripple=false>
                    <v-list-item v-for="(item, i) in allUsers" :key="i" :ripple=false>
                        <v-row justify="space-between">
                            <v-col>
                                {{item.name}}
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-chip 
                                    outlined
                                    label
                                    small
                                    class="justify-center"
                                    color="green"
                                    text-color="white"
                                    style="font-size: 10px; width: 75px"
                                >
                                    {{item.role}}
                                </v-chip>
                            </v-col>
                            <v-col cols="12" md="2">
                                <v-btn small @click="deleteUser(item)">
                                    <v-icon small color="red">delete</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    
                    </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
</div>
</template>

<script>
import EditTask from "@/components/EditTask";
import EditNews from "@/components/EditNews";
import AddTask from "@/components/AddTask";
import AddNews from "@/components/AddNews";
import AddUser from "@/components/AddUser";

export default {
    name: "Admin",
    components: {EditTask, EditNews, AddTask, AddNews, AddUser},
    data: () => ({
        task: 1,
        news: 1,
        user: 1,
        users: [
            {name: "Radu Bagrin", email: "bagrin.radu@gmail.com", role: "admin"},
            {name: "Ion Popescu", email: "ion.popescu@gmail.com", role: "support"},
            {name: "Andreea Dumitru", email: "andreea.dumitru@gmail.com", role: "user"}
        ]
    }),
    computed: {
        allTasks: function () {
            return this.$store.getters.tasks;
        },
        allNews: function () {
            return this.$store.getters.news;
        },
        allUsers: function() {
            /* eslint-disable */
            // debugger
            return this.$store.getters.users;
        }
    },
    methods: {
        async deleteTask(task) {
            try {

                const deleted = await this.$store.dispatch('deleteTask', task._id);

                if (!deleted) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }
        },
        async deleteNews(news) {
            try {

                const deleted = await this.$store.dispatch('deleteNews', news._id);

                if (!deleted) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }

        },
        async deleteUser(user) {
            try {

                const deleted = await this.$store.dispatch('deleteUser', user._id);

                if (!deleted) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
    created() {
        this.$store.dispatch('getTasksFromDB');
        this.$store.dispatch('getNewsFromDB');
        this.$store.dispatch('getUsersFromDB');
    },
};
</script>

<style>

</style>
