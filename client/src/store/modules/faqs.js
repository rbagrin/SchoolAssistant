const {
    FAQS_URL
} = require("../../utils/constants").URLS;

export default {
    state: {
        faqs: [],
    },

    getters: {
        faqs(state) {
            return state.faqs;
        }
    },

    mutations: {
        updateFaqs: (state, faqs) => (state.faqs = faqs),
    },

    actions: {
        getFaqsFromDB({
            commit
        }) {

            return fetch(FAQS_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access-token')
                    },
                    mode: "cors"
                })
                .then(res => res.json())
                .then(res => {

                    if (res.success) {

                        commit("updateFaqs", res.faqs);
                        return res.faqs;
                    }
                    return [];
                })
                .catch(err => {
                    console.log(err);
                    return [];
                });
        },

        addFaq({
            dispatch
        }, faq) {

            return fetch("http://localhost:5000/faqs", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                    },
                    body: JSON.stringify(faq)
                })
                .then(res => res.json())
                .then(res => {

                    dispatch("getFaqsFromDB");
                    return res.success;
                })
                .catch(err => {

                    console.log(err);
                    return false;
                })
        },

        updateFaq({
            dispatch
        }, payload) {

            return fetch("http://localhost:5000/faqs/" + payload.questionId, {
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
                    dispatch("getFaqsFromDB");
                    return res.success;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        },

        deleteFaq({
            dispatch
        }, questionId) {

            return fetch("http://localhost:5000/faqs/" + questionId, {
                    method: "DELETE",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                    }
                })
                .then((res) => {

                    dispatch("getFaqsFromDB");
                    return res.status === 204;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        }
    }
};