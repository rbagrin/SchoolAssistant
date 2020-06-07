<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn small v-on="on">
            <v-icon small color="green" style="font-weight: bold; font-size: 24px">add</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Add News
        </v-card-title>

        <v-card-text>
            <v-radio-group v-model="course" row>
                <v-radio label="Programare Web" value="Programare Web"></v-radio>
                <v-radio label="E-commerce" value="E-commerce"></v-radio>
                <v-radio label="CAD/CASE" value="CAD/CASE"></v-radio>
            </v-radio-group>
            <v-text-field v-model="title" name="news-title" :value="title" label="News Title"></v-text-field>
            <v-textarea
                id="news-description"
                auto-grow
                outlined
                v-model="newsText"
                name="news-description"
                label="Content"
                :value="newsText"
            ></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            :disabled="!valid"
            @click="addNews"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
      props: ['news'],
    data () {
      return {
            course: "",
            title: "",
            newsText: "",
            dialog: false,
      }
    },
    methods: {
        async addNews() {
            this.loading = true;

            const news = {
                title: this.title,
                course: this.course,
                newsText: this.newsText,
                postedBy: this.getUserName
            };

            try {

                const added = await this.$store.dispatch('addNews', news);
                if (!added) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }

            this.loading = false;
            this.dialog = false;
        }
    },
    
    computed: {
        valid () {
            return this.course && this.title && this.newsText;
        },
        getUserName() {
            return this.$store.getters.user_name;
        }
    }
  }
</script>