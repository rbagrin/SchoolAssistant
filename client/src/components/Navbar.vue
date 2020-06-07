<template>
  <nav>
    <v-app-bar flat app dark color="#000">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title style="color: #26A69A">
        <span class="font-weight-light">Let's</span>
        <span style="font-color: #004D40">PROGRAM</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="user" class="black--text" color="#00897B" @click="logout">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app temporary v-model="drawer" dark color="#222">
      <v-list>
        <v-subheader style="color: #4DB6AC">MENU</v-subheader>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in links"
            :key="i"
            router
            :to="item.route"
            class="mx-1" 
          >
            <v-list-item-icon>
              <v-icon left style="color: #4DB6AC">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-html="item.text" style="color: #4DB6AC"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            drawer: false,
            snackbar: false,
        };
    },
    computed: {
        user: function () {
            return this.$store.state.user.token && this.$store.state.user.token !== "null";
        },
        links: function () {
            if (this.$store.state.user.token && this.$store.state.user.token !== "null") {
                let menu = [];

                if (this.$store.state.user.user_role === "admin") {
                    menu.push({
                        icon: "info",
                        text: "Admin",
                        route: "/admin"
                    });
                }

                menu.push(
                    {
                        icon: "dashboard",
                        text: "Dashboard",
                        route: "/"
                    },
                    {
                        icon: "contact_support",
                        text: "FAQ",
                        route: "/faq"
                    },
                    {
                        icon: "info",
                        text: "About",
                        route: "/about"
                    }
                );

                return menu;
            }

            return [
                {
                    icon: "fa-sign-in-alt",
                    text: "Log in",
                    route: "/login"
                },
                {
                    icon: "fa-user-plus",
                    text: "Register",
                    route: "/register"
                }
            ];
            
        }
    },

    methods: {
        logout() {

            this.$store.dispatch('LOGOUT');
            this.$router.push("/login");
        },
    }
};
</script>

<style scoped></style>
