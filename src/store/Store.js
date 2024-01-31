import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const SET_SEARCH_BRANCH = "SET_SEARCH_BRANCH";
const SET_LOADING = "SET_LOADING";
const SET_USER = "SET_USER";
const RESET_USER = "RESET_USER";
const SET_REPO = "SET_REPO";
const RESET_REPO = "RESET_REPO";
const SET_BRANCH = "SET_BRANCH";
const SET_CURRENT_BRANCH = "SET_CURRENT_BRANCH";
const RESET_BRANCH = "RESET_BRANCH";
const RESET_CURRENT_BRANCH = "RESET_CURRENT_BRANCH";
const SET_CONTENT = "SET_CONTENT";
const RESET_CONTENT = "RESET_CONTENT";
const SET_SEARCH_ONE_BRANCH = "SET_SEARCH_ONE_BRANCH";
const SET_CURRENT_CONTENT = "SET_CURRENT_CONTENT";
const RESET_CURRENT_CONTENT = "RESET_CURRENT_CONTENT";

export default new Vuex.Store({
    state: {
        searchQuery: "",
        searchBranch: "",
        searchOneBranch: "",
        currentContent: "",
        loading: false,
        user: null,
        repos: null,
        branches: [],
        content: [],
    },
    mutations: {
        [SET_SEARCH_QUERY]: (state, searchQuery) =>
            (state.searchQuery = searchQuery),
        [SET_SEARCH_BRANCH]: (state, searchBranch) =>
            (state.searchBranch = searchBranch),
        [SET_SEARCH_ONE_BRANCH]: (state, searchOneBranch) => {
            state.searchOneBranch = searchOneBranch;
        },
        [SET_CURRENT_CONTENT]: (state, currentContent) => {
            state.currentContent = currentContent;
        },
        [SET_LOADING]: (state, loading) => (state.loading = loading),
        [SET_USER]: (state, user) => (state.user = user),
        [RESET_USER]: (state) => (state.user = null),
        [SET_REPO]: (state, repos) => (state.repos = repos),
        [RESET_REPO]: (state) => (state.repos = null),
        [SET_BRANCH]: (state, branches) => (state.branches = branches),
        [SET_CURRENT_BRANCH]: (state, branches) => (state.branches = branches),
        [RESET_BRANCH]: (state) => (state.branches = null),
        [RESET_CURRENT_BRANCH]: (state) => (state.branches = null),
        [SET_CONTENT]: (state, content) => (state.content = content),
        [RESET_CONTENT]: (state) => (state.content = null),
        [RESET_CURRENT_CONTENT]: (state) => (state.currentContent = null),
    },
    actions: {
        setSearchQuery({ commit }, searchQuery) {
            commit(SET_SEARCH_QUERY, searchQuery);
        },
        setSearchBranch({ commit }, searchBranch) {
            commit(SET_SEARCH_BRANCH, searchBranch);
        },
        setSearchOneBranch({ commit }, searchOneBranch) {
            commit(SET_SEARCH_ONE_BRANCH, searchOneBranch);
        },
        setSearchContent({ commit }, currentContent) {
            commit(SET_CURRENT_CONTENT, currentContent);
        },
        async search({ commit, state }) {
            commit(SET_LOADING, true);
            try {
                const { data } = await axios.get(
                    `https://api.github.com/users/${state.searchQuery}`
                );
                commit(SET_USER, data);
            } catch (e) {
                commit(RESET_USER);
            }
            commit(SET_LOADING, false);
        },
        async searchRepo({ commit, state }) {
            commit(SET_LOADING, true);
            try {
                const { data } = await axios.get(
                    `https://api.github.com/users/${state.searchQuery}/repos`
                );
                commit(SET_REPO, data);
            } catch (e) {
                commit(RESET_REPO);
            }
            commit(SET_LOADING, false);
        },
        async searchBranch({ commit, state }) {
            commit(SET_LOADING, true);
            try {
                const { data } = await axios.get(
                    `https://api.github.com/repos/${state.searchQuery}/${state.searchBranch}/branches`
                );
                commit(SET_BRANCH, data);
            } catch (e) {
                commit(RESET_BRANCH);
            }
            commit(SET_LOADING, false);
        },
        async searchCorrentBranch({ commit, state }) {
            commit(SET_LOADING, true);
            try {
                const { data } = await axios.get(
                    `https://api.github.com/repos/${state.searchQuery}/${state.searchBranch}/branches/${state.searchOneBranch}`
                );
                commit(SET_CURRENT_BRANCH, data);
            } catch (e) {
                commit(RESET_CURRENT_BRANCH);
            }
            commit(SET_LOADING, false);
        },
        async searchBranchContent({ commit, state }) {
            commit(SET_LOADING, true);
            try {
                const { data } = await axios.get(
                    `https://api.github.com/repos/${state.searchQuery}/${state.searchBranch}/contents`
                );
                commit(SET_CONTENT, data);
            } catch (e) {
                commit(RESET_CONTENT);
            }
            commit(SET_LOADING, false);
        },
        async searchBranchCurrentContent({ commit, state }) {
            commit(SET_LOADING, true);
            try {
                const { data } = await axios.get(
                    `https://api.github.com/repos/${state.searchQuery}/${state.searchBranch}/contents/${state.currentContent}`
                );
                commit(SET_CURRENT_CONTENT, data);
            } catch (e) {
                commit(RESET_CURRENT_CONTENT);
            }
            commit(SET_LOADING, false);
        },
    },
});
