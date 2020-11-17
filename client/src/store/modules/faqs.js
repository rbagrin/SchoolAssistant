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
        /**
         * Returns FAQs from DB
         * @param {*} param0 
         */
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

        /**
         * Add FAQ to DB
         * @param {*} param0 
         * @param {*} faq 
         */
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

        /**
         * Updates DB FAQ
         * @param {*} param0 
         * @param {*} payload 
         */
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

        /**
         * Deletes FAQ by id form DB
         * @param {*} param0 
         * @param {String} questionId 
         */
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