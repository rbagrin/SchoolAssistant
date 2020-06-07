import Vue from "vue";
import Vuex from "vuex";

import FaqsModule from './modules/faqs';
import UsersModule from './modules/user';
import TasksModule from './modules/tasks';
import NewsModule from './modules/news';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        user: UsersModule,
        faqs: FaqsModule,
        tasks: TasksModule,
        news: NewsModule
    }
});