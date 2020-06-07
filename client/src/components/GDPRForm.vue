<template>
    <div class="text-center">
        <v-dialog v-model="gdprForm" width="800">
            <template v-slot:activator="{ on }">
                <v-btn
                  class="light-green darken-2 white--text m3"
                  large
                  v-on="on"
                >
                  <v-icon left>email</v-icon>
                  <span>Register</span>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Our Company Privacy Policy
                </v-card-title>

                <v-card-text>
                    <p style="margin-top: 10px">Our Company is part of the Our Company Group which includes Our Company International and Our Company Direct. This privacy policy will explain how our organization uses the personal data we collect from you when you use our website.</p>
                    <p>Topics:
                        <ul>
                            <li>What data do we collect?</li>
                            <li>How do we collect your data?</li>
                            <li>How do we store your data?</li>
                        </ul>
                    </p>
                    <h2>What data do we collect?</h2>
                    <p>Our Company collects the following data:
                        <ul>
                            <li>Personal identification information (Name, email address, phone number, etc.)</li>
                        </ul>
                    </p>
                    <h2>How do we collect your data?</h2>
                    <p>You directly provide Our Company with most of the data we collect. We collect data and process data when you:
                        <ul>
                            <li>Register online or place an order for any of our products or services.</li>
                            <li>Voluntarily complete a customer survey or provide feedback on any of our message boards or via email.</li>
                            <li>Use or view our website via your browser’s cookies.</li>
                        </ul>
                    </p>
                    <h2>How will we use your data?</h2>
                    <p>Our Company collects your data so that we can:
                        <ul>
                            <li>Process your order and manage your account.</li>
                            <li>Email you with special offers on other products and services we think you might like.</li>
                        </ul>
                    </p>
                    <p>When Our Company processes your order, it may send your data to, and also use the resulting information from, credit reference agencies to prevent fraudulent purchases.</p>
                    <h2>How do we store your data?</h2>
                    <p>Our Company securely stores your data at [enter the location and describe security precautions taken].</p>
                    <p>Our Company will keep your [enter type of data] for [enter time period]. Once this time period has expired, we will delete your data by [enter how you delete users’ data].</p>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :loading="loading" text @click="submit">
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: ['name', 'email', 'password', 'password2'],
    data() {
        return {
            gdprForm: false,
            loading: false
        }
    },
    methods: {
        submit() {

            this.loading = true;
            // TODO: encrypt password
            this.$store.dispatch("REGISTER", {
                name: this.name,
                email: this.email,
                password: this.password,
                password2: this.password2
            })
            .then(res => res.json())
            .then(res => {

                this.loading = false;
                this.gdprForm = false;

                if (res.success) {
                    // TODO: Add snackbar
                    this.$router.push("/login");
                } else {
                    alert(res.message);
                }
            })
            .catch(err => {
                this.loading = false;
                this.gdprForm = false;
                console.log(err);
            });
        }
    },
}
</script>