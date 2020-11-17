<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <v-list-item-content v-on="on">
                <v-card tile dark style="margin-bottom: 10px">
                    <v-card-title>{{task.title}}</v-card-title>

                    <v-card-text>
                        <p class="news-deadline">Deadline: {{task.deadline}}</p>
                    </v-card-text>
                </v-card>
            </v-list-item-content>
        </template>
        <v-card dark>
            <v-toolbar dark color="#004D40">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{task.title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text :disabled="disabledSubmit" @click="submitAnswer">Submit</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list three-line subheader>
                <v-subheader>{{task.course}}</v-subheader>
                <v-list-item disabled inactive>
                    <v-list-item-content style="margin-bottom: 20px">
                        <h1 style="margin-bottom: 15px; color: white">Task Description</h1>
                        <p style="margin-bottom: 20px;">{{task.taskDescription}}</p>
                        <v-list-item-subtitle>Assigned by <b>{{task.assignedBy}}</b></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item inactive>
                    <v-list-item-content>
                        <v-textarea v-model="answer" id="answer" dark auto-grow outlined name="answer" label="Answer"
                            value=""></v-textarea>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['task'],
    data() {
        return {
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            answer: ""
        }
    },
    computed: {
        /**
         * Enables/disables submit button
         */
        disabledSubmit() {
            return !this.answer;
        },
        /**
         * @returns {*} name and email object
         */
        getCurrentUserObject() {

            return {
                name: this.$store.getters.user_name,
                email: this.$store.getters.user_email
            };
        }
    },
    methods: {
        /**
         * Handles submit answer
         */
        async submitAnswer() {

            const answer = {
                title: this.task.title,
                taskDescription: this.task.taskDescription,
                assignedBy: this.task.assignedBy,
                deadline: this.task.deadline,
                course: this.task.course,
                answer: this.answer,
                answeredBy: this.getCurrentUserObject,
                send_response_to: this.task.send_response_to
            }

            return fetch("http://localhost:5000/tasks/answer", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                    },
                    body: JSON.stringify(answer)
                })
                .then(res => res.json())
                .then(res => {

                    this.dialog = false;
                    return res.success;
                })
                .catch(err => {

                    console.log(err);
                    return false;
                });
        }
    }
}
</script>