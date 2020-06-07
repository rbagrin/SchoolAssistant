<template>
  <v-container class="register">
    <v-layout row wrap justify-space-around>
      <v-flex xs12 md6>
        <v-card elevation="1" height="100%" class="pa-3" color="#fff">
          <v-card-title>
            <h2>Register</h2>
          </v-card-title>
          <v-card-text>
            <v-form class="px-5" ref="form">
              <v-text-field
                label="Name"
                v-model="name"
                prepend-icon="account_circle"
                :rules="inputRules"
              ></v-text-field>
              <v-text-field
                label="E-mail"
                v-model="email"
                prepend-icon="email"
                :rules="emailRules"
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
              <v-text-field
                label="Repeat Password"
                v-model="password2"
                :rules="passwordRules2"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="done_all"
                counter
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <br />
              <v-layout row wrap justify-center align-end>
                <!-- <v-btn
                  class="light-green darken-2 white--text m3"
                  large
                  @click="submit"
                  :loading="loading"
                >
                  <v-icon left>email</v-icon>
                  <span>Register</span>
                </v-btn> -->
                <GDPRForm :name="name" :email="email" :password="password" :password2="password2" />
              </v-layout>
            </v-form>
          </v-card-text>
          <v-container>
            Already have an account? <a href="login">Login here!</a>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GDPRForm from '@/components/GDPRForm';

export default {
    name: "Register",
    components: {GDPRForm},
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
            passwordRules2: [v => v === this.password || "Passwords don't match"],
            emailRules: [
                v => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return (v && pattern.test(v)) || "Invalid e-mail.";
                }
            ],
            name: "",
            email: "",
            password: "",
            password2: "",
            loading: false
        };
    },
    computed: {
        progress() {
            return Math.min(100, this.value.length * 10);
        },
        color() {
            return ["error", "warning", "success"][Math.floor(this.progress / 40)];
        }
    }
};
</script>

<style scoped>
.register {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
