const {
    NEWS_URL
} = require("../../utils/constants").URLS;

export default {
    state: {
        news: [],
    },

    getters: {
        news(state) {
            return state.news;
        }
    },

    mutations: {
        updateNews: (state, news) => (state.news = news),
    },

    actions: {
        /**
         * Get NEWS from DB
         * @param {*} param0 
         */
        getNewsFromDB({
            commit
        }) {

            return fetch(NEWS_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access-token')
                    },
                    mode: "cors"
                })
                .then(res => res.json())
                .then(res => {

                    if (res.success) {

                        commit("updateNews", res.news);
                        return res.news;
                    }
                    return [];
                })
                .catch(err => {
                    console.log(err);
                    return [];
                });
        },

        /**
         * Add NEWS to DB
         * @param {*} param0 
         * @param {*} news 
         */
        addNews({
            dispatch
        }, news) {

            return fetch("http://localhost:5000/news", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                    },
                    body: JSON.stringify(news)
                })
                .then(res => res.json())
                .then(res => {

                    dispatch("getNewsFromDB");
                    return res.success;
                })
                .catch(err => {

                    console.log(err);
                    return false;
                })
        },

        /**
         * Updates NEWS to DB
         * @param {*} param0 
         * @param {*} payload 
         */
        updateNews({
            dispatch
        }, payload) {

            return fetch("http://localhost:5000/news/" + payload.newsId, {
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
                    dispatch("getNewsFromDB");
                    return res.success;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        },

        /**
         * Deletes NEWS by id from DB
         * @param {*} param0 
         * @param {String} newsId 
         */
        deleteNews({
            dispatch
        }, newsId) {

            return fetch("http://localhost:5000/news/" + newsId, {
                    method: "DELETE",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                    }
                })
                .then((res) => {

                    dispatch("getNewsFromDB");
                    return res.status === 204;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        }
    }
};