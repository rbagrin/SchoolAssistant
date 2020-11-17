const {
    LOGIN_URL,
    REGISTER_URL,
    USERS_URL
} = require("../../utils/constants").URLS;

export default {
    state: {
        token: localStorage.getItem('access-token') || null,
        user: null,
        user_name: localStorage.getItem('user_name') || null,
        user_email: localStorage.getItem('user_email') || null,
        user_role: localStorage.getItem('user_role') || null,
        users: null
    },

    getters: {
        accessToken(state) {
            return state.token;
        },
        users(state) {
            return state.users;
        },
        user_name(state) {
            return state.user_name;
        },
        user_email(state) {
            return state.user_email;
        },
        user_role(state) {
            return state.user_role;
        },
        user(state) {
            return state.user;
        }
    },

    mutations: {
        /**
         * Logout
         * @param {*} state
         */
        logout: (state) => {
            state.token = null;
            state.user = null;
        },

        /**
         * Sets token to localStorage
         * @param {*} state 
         * @param {String} token 
         */
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('access-token', token);
        },

        /**
         * Sets name to localStorage
         * @param {*} state 
         * @param {String} name 
         */
        setUserName(state, name) {
            state.user_role = name;
            localStorage.setItem("user_name", name);
        },

        /**
         * Sets user's email to localStorage
         * @param {*} state 
         * @param {String} email 
         */
        setUserEmail(state, email) {
            state.user_email = email;
            localStorage.setItem("user_email", email);
        },

        /**
         * Sets role to localStorage
         * @param {*} state 
         * @param {*} role 
         */
        setUserRole(state, role) {
            state.user_role = role;
            localStorage.setItem("user_role", role);
        },

        /**
         * Sets user to localStorage
         * @param {*} state 
         * @param {*} user 
         */
        setUser(state, user) {
            state.user = user;
            localStorage.setItem("user", user);
        },
        /**
         * @param {*} state
         * @param {*} users
         */
        updateUsers: (state, users) => (state.users = users),
    },


    actions: {
        LOGIN: ({
            commit
        }, payload) => {

            return fetch(LOGIN_URL, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })
                .then(res => res.json())
                .then(res => {

                    if (res.success) {
                        commit('setToken', res.token);
                        commit('setUser', res.user);
                        commit('setUserName', res.user.name);
                        commit('setUserEmail', res.user.email);
                        commit('setUserRole', res.user.user_role);
                    }
                    return res.success;
                })
                .catch(err => {
                    console.log(err);
                    alert("A error occured when trying to log in!");
                    return false;
                })
        },

        FETCH_ACCESS_TOKEN({
            commit
        }) {
            commit('setToken', localStorage.getItem('access-token'));
            commit('setUser', localStorage.getItem('user'));
            commit('setUserName', localStorage.getItem('user_name'));
            commit('setUserEmail', localStorage.getItem('user_email'));
            commit('setUserRole', localStorage.getItem('user_role'));
        },

        LOGOUT({
            commit
        }) {
            localStorage.removeItem('access-token');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_role');
            localStorage.removeItem('user');
            commit('setUser', null);
            commit('logout');
        },

        REGISTER: ({
            commit
        }, payload) => {
            console.log(commit);

            console.log(REGISTER_URL);

            return fetch(REGISTER_URL, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
        },

        getUsersFromDB({
            commit
        }) {

            return fetch(USERS_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access-token')
                    },
                    mode: "cors"
                })
                .then(res => res.json())
                .then(res => {

                    if (res.success) {

                        commit("updateUsers", res.users);
                        return res.users;
                    }
                    return [];
                })
                .catch(err => {
                    console.log(err);
                    return [];
                });
        },

        addUser({
            dispatch
        }, user) {

            return fetch(USERS_URL, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                    },
                    body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(res => {

                    dispatch("getUsersFromDB");
                    return res.success;
                })
                .catch(err => {

                    console.log(err);
                    return false;
                })
        },

        updateUser({
            dispatch
        }, payload) {

            return fetch("http://localhost:5000/users/" + payload.userId, {
                    method: "PUT",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                    },
                    body: JSON.stringify(payload.data)
                })
                .then(res => res.json())
                .then((res) => {
                    dispatch("getUsersFromDB");
                    return res.success;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        },

        deleteUser({
            dispatch
        }, userId) {

            return fetch(USERS_URL + userId, {
                    method: "DELETE",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                    }
                })
                .then((res) => {

                    dispatch("getUsersFromDB");
                    return res.status === 204;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        }
    }
};