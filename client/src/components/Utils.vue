<template>
    <v-list flat dark color="#004D40">
        <v-subheader>UTILS</v-subheader>
        <v-list-item v-model="item" color="primary" style="padding-top: 10px">
            <v-calendar dark></v-calendar>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    data: () => ({
        item: 1,
        items: [],
    }),
}
</script>