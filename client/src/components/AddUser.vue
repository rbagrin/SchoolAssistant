<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn small v-on="on">
                    <v-icon small color="green" style="font-weight: bold; font-size: 24px">add</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Add User
                </v-card-title>

                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field v-model="name" :counter="true" :rules="nameRules" label="Name" required>
                        </v-text-field>

                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

                        <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="passwordRules" :type="showPassword ? 'text' : 'password'" name="password"
                            label="Password" hint="At least 8 characters" counter
                            @click:append="showPassword = !showPassword"></v-text-field>

                        <v-select v-model="role" :items="roles" :rules="[v => !!v || 'Role is required']" label="Role"
                            required></v-select>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" color="primary" text @click="addUser">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "",
            password: "",
            showPassword: false,
            passwordRules: [
                v => (v && v.length >= 8) || 'Password must be at least 8 characters long.',
            ],
            role: null,
            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length >= 5) || 'Name must be at least 5 characters long.',
                v => (v && v.length <= 32) || 'Name must be less than 32 characters.',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            roles: [
                'admin',
                'support',
                'user'
            ],
            dialog: false
        }
    },
    methods: {
        /**
         * Adds user
         */
        async addUser() {
            this.loading = true;

            const user = {
                name: this.name,
                email: this.email,
                password: this.password,
                role: this.role
            };

            try {

                const added = await this.$store.dispatch('addUser', user);
                if (!added) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }

            this.loading = false;
            this.dialog = false;
        },
        /**
         * @returns {Boolean}
         */
        validate() {
            this.$refs.form.validate()
        },
    },
    computed: {}
}
</script>