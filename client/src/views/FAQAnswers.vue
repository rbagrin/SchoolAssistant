<template>
  <v-container class="faq my-5">
    <h1 style="color: #fff">Frequently Asked Questions - Support</h1>

    <v-container fluid>
        <v-row v-if="true" class="justify-start mx-0">
          <v-select
                    v-model="questionSelect"
                    :items="questions"
                    label="Display questions"
                    required
                ></v-select>
        </v-row>
        <v-spacer></v-spacer>
      <v-row class="justify-end">
        <FAQform />
      </v-row>
    </v-container>

    <v-expansion-panels focusable v-model="currentQuestion" dark>
      <v-expansion-panel v-for="faq in questionSelectArray" :key="faq.id">
        <v-expansion-panel-header>{{ faq.question }}</v-expansion-panel-header>
        <v-expansion-panel-content height="200px">
          <v-textarea
            class="mx-2"
            v-model="answer"
            label="Answer the question"
            rows="1"
            prepend-icon="comment"
            auto-grow
          ></v-textarea>
          <v-row class="mx-0" justify="space-between">
                <v-col cols=12 md="3" align="end" justify="end">
                    <v-checkbox
                        v-model="important"
                        label="Mark as important"
                        color="#4DB6AC"
                        hide-details
                    ></v-checkbox>
            </v-col>
            <v-col cols=12 md="2" align="end">
                <v-btn
                small
                color="info"
                style="margin-right: 20px"
                @click="reply(faq)"
                :loading="loadingReplyButton"
                >
                <v-icon>fa-reply</v-icon>
                </v-btn>
                <v-btn
                small
                icon
                color="error"
                @click="deleteQuestion(faq)"
                :loading="loadingDeleteButton"
                >
                <v-icon>fa-trash</v-icon>
                </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import FAQform from "@/components/FAQform";

export default {
    name: "FAQAnswers",

    components: {
        FAQform
    },

    data() {
        return {
            answer: "",
            currentQuestion: null,
            loadingReplyButton: false,
            loadingDeleteButton: false,
            important: false,
            questionSelect: "All questions",
            questions: [
                "All questions",
                "Unanswered questions",
                "Important questions"
            ],
        };
    },

    created() {
        this.$store.dispatch('getFaqsFromDB')
    },

    methods: {
        async reply(faq) {
            this.loadingReplyButton = true;

            const questionId = faq._id;
            let data = {
                question: faq.question,
                answer: this.answer,
                answeredBy: this.getUserName,
                postedBy: this.postedBy,
                send_response_to: faq.postedByEmail,
                important: this.important
            };
            this.answer = "";

            try {

                const updated = await this.$store.dispatch('updateFaq', {
                    questionId,
                    data
                });
                console.log("Updated = ", updated)
                if (!updated) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }

            this.loadingReplyButton = false;
        },

        async deleteQuestion(faq) {
            
            this.loadingDeleteButton = true;

            try {

                const deleted = await this.$store.dispatch('deleteFaq', faq._id);

                if (!deleted) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }

            this.loadingDeleteButton = false;
        }
    },

    computed: {
        allFaqs: function () {
            return this.$store.getters.faqs;
        },
        unansweredFaqs: function () {
            return this.$store.getters.faqs.filter(
                faq => !faq.answer && !faq.answeredBy
            );
        },
        importantFaqs: function () {
            return this.$store.getters.faqs.filter(
                faq => faq.important
            );
        },
        questionSelectArray() {

            if (this.questionSelect === "Unanswered questions") {
                return this.unansweredFaqs;
            }

            if (this.questionSelect === "Important questions") {
                return this.importantFaqs;
            }
                
            return this.allFaqs;
        },
        getUserName() {
            return this.$store.getters.user_name;
        },
        getUserEmail() {
            return this.$store.getters.user_email;
        }
    }
};
</script>

<style scoped>
@media only screen and (max-width: 960px) {
  .faq {
    margin: 0;
    padding: 0;
  }
}
</style>
