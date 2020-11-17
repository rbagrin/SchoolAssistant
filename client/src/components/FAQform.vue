<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn color="#4DB6AC" dark v-on="on">
                    <v-icon left>add</v-icon>
                    <span>Question</span>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Add new question:
                </v-card-title>

                <v-card-text>
                    <v-textarea class="mx-2" v-model="question" label="Ask your question" rows="1"
                        prepend-icon="comment"></v-textarea>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="submit" :loading="loading" :disabled="loading">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" top color="success" :timeout="3000">
            <span>Question successfully addded. Wait for a response.</span>
            <v-btn color="white" text @click="snackbar = false">
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>

        <v-snackbar v-model="snackbarErr" top color="error" :timeout="4000">
            <span>A error occured! Please, try again later!</span>
            <v-btn color="black" text @click="snackbarErr = false">
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            question: "",
            snackbar: false,
            snackbarErr: false,
            loading: false
        };
    },
    methods: {
        /**
         * Submit handler
         */
        async submit() {
            this.loading = true;
            let data = {
                question: this.question,
                postedBy: this.getUserName,
                postedByEmail: this.getUserEmail
            };
            this.question = "";

            try {
                const success = await this.$store.dispatch('addFaq', data);

                if (!success) {
                    alert("Error happened!");
                }
            } catch (err) {
                console.log(err);
            }

            this.snackbar = true;
            this.dialog = false;
            this.loading = false;
        }
    },
    computed: {
        /**
         * @returns {String} username
         */
        getUserName() {
            return this.$store.getters.user_name;
        },
        /**
         * @returns {String} email
         */
        getUserEmail() {
            return this.$store.getters.user_email;
        }
    }
};
</script>
