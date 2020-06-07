<template>
  <v-container class="login">
    <v-layout row wrap justify-space-around>
      <v-flex xs12 md6>
        <v-card elevation="5" height="100%" class="pa-3" color="#fff">
          <v-card-title>
            <h2>Login</h2>
          </v-card-title>
          <v-alert color="error" :value="error">The username or the password are incorrect!</v-alert>
          <v-card-text>
            <v-form class="px-10" ref="form">
              <v-text-field
                label="Username or e-mail"
                v-model="username"
                prepend-icon="account_circle"
                :rules="inputRules"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                hint="At least 8 characters"
                prepend-icon="fingerprint"
                counter
                @click:append="showPassword = !showPassword"
                id="pass"
              ></v-text-field>
              <br />
              <v-layout row wrap justify-center align-end>
                <v-btn
                  class="light-green darken-2 white--text m3"
                  large
                  @click="submit"
                  :loading="loading"
                >
                  <v-icon left>fingerprint</v-icon>
                  <span>Login</span>
                </v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-container>
            Don't have an account? <a href="register">Register here!</a>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            showPassword: false,
            inputRules: [
                v => (v && v.length >= 6) || "Minimum length is 6 characters"
            ],
            passwordRules: [
                v => (v && v.length >= 8) || "Minimum length is 6 characters",
                v =>
                (v && v.match(/\d+/) !== null) ||
                "Password requires at least a number"
            ],
            username: "",
            password: "",
            loading: false,
            error: false
        };
    },
    methods: {
        async submit() {
            if (this.$refs.form.validate()) {

                this.loading = true;

                try {
                    const logedIn = await this.$store.dispatch("LOGIN", {
                        username: this.username,
                        password: this.password
                    });
                    if (logedIn) {
                        this.$router.push("/");
                    } else {
                        this.$refs.form.reset();
                        this.error = true;
                    }
                } catch (err) {
                    console.log(err);
                }
                this.loading = false;
            }
        }
    },
    computed: {}
};
</script>

<style scoped>
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
