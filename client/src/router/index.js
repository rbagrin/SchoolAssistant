import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

const Store = require("../store/store").store;

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter: (to, from, next) => {

            Store.dispatch('FETCH_ACCESS_TOKEN');
            if (!Store.state.user.token || Store.state.user.token === "null") {
                next('/login');
            } else {
                next();
            }
        }
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
        beforeEnter: (to, from, next) => {

            Store.dispatch('FETCH_ACCESS_TOKEN');
            if (Store.state.user.token && Store.state.user.token !== "null") {
                next('/');
            } else {
                next();
            }
        }
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/Register.vue"),
        beforeEnter: (to, from, next) => {

            Store.dispatch('FETCH_ACCESS_TOKEN');

            if (Store.state.user.token && Store.state.user.token !== "null") {
                next('/');
            } else {
                next();
            }
        }
    },
    {
        path: "/faq",
        name: "FAQ",
        component: () => import("../views/FAQ.vue"),
        beforeEnter: (to, from, next) => {

            Store.dispatch('FETCH_ACCESS_TOKEN');
            if (!Store.state.user.token || Store.state.user.token === "null") {
                next('/login');
            } else {
                next();
            }
        }
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue")
    },
    {
        path: "/faq/answers",
        name: "FAQAnswers",
        component: () => import("../views/FAQAnswers.vue"),
        beforeEnter: (to, from, next) => {

            Store.dispatch('FETCH_ACCESS_TOKEN');
            if (!Store.state.user.token || Store.state.user.token === "null") {
                next('/login');
            } else {
                next();
            }
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import("../views/Admin.vue"),
        beforeEnter: (to, from, next) => {

            Store.dispatch('FETCH_ACCESS_TOKEN');
            if (!Store.state.user.token || Store.state.user.token === "null") {
                next('/login');
            } else if (Store.state.user.user_role === "admin") {
                next();
            } else {
                next('/')
            }
        }
    },
    {
        path: '*',
        beforeEnter: (to, from, next) => {

            Store.dispatch('FETCH_ACCESS_TOKEN');
            if (!Store.state.user.token || Store.state.user.token === "null") {
                next('/login');
            }
            if (Store.state.user.token) {
                next('/');
            }
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;