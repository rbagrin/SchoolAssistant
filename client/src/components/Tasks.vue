<template>
    <v-list flat dark color="#004D40">
        <v-subheader>TASKS</v-subheader>
        <v-list-item-group v-model="task" color="primary">
            <v-list-item :ripple=false v-for="(task, i) in tasks" :key="i">
                <TaskDetails :task="task" />
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
import TaskDetails from "@/components/TaskDetails";

export default {
    props: ['tasks'],
    components: { TaskDetails },
    data: () => ({
        task: 1,
    }),
}
</script>