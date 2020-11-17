<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn small v-on="on">
                    <v-icon small color="blue">create</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Edit task
                </v-card-title>

                <v-card-text>
                    <v-radio-group v-model="course" row>
                        <v-radio label="Programare Web" value="Programare Web"></v-radio>
                        <v-radio label="E-commerce" value="E-commerce"></v-radio>
                        <v-radio label="CAD/CASE" value="CAD/CASE"></v-radio>
                    </v-radio-group>
                    <v-text-field v-model="title" name="task-title" :value="title" label="Task Title"></v-text-field>
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition"
                        offset-y max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="dateFormatted" label="Deadline" hint="DD/MM/YYYY" append-icon="event"
                                readonly @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
                    </v-menu>
                    <v-textarea id="task-description" auto-grow outlined v-model="taskDescription"
                        name="task-description" label="Task Description" :value="taskDescription"></v-textarea>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text :disabled="!valid" @click="updateTask(task)">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: ['task'],
    data() {
        return {
            course: this.task.course,
            title: this.task.title,
            taskDescription: this.task.taskDescription,
            dialog: false,
            date: new Date(this.task.deadline).toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date(this.task.deadline).toISOString().substr(0, 10)),
            menu: false,
        }
    },
    methods: {
        /**
         * Updates task
         */
        async updateTask(task) {

            this.loading = true;

            const taskId = task._id;
            const data = {
                title: this.title,
                course: this.course,
                taskDescription: this.taskDescription,
                deadline: this.date
            };

            try {

                const updated = await this.$store.dispatch('updateTask', {
                    taskId,
                    data
                });

                if (!updated) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }

            this.loading = false;
            this.dialog = false;

        },
        /**
         * Formats date
         */
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        /**
         * Parses date
         */
        parseDate(date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
    },
    computed: {
        /**
         * Get formatted date
         * @returns {String}
         */
        computedDateFormatted() {
            return this.formatDate(this.date)
        },
        /**
         * @returns {Boolean}
         */
        valid() {
            return this.course && this.title && this.taskDescription && this.date;
        }
    },

    watch: {
        /**
         * Updates date
         */
        date() {
            this.dateFormatted = this.formatDate(this.date)
        },
    },
}
</script>