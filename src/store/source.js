import {
    fetchData
} from '../cacheService.js'

const Main = {
    namespaced: true,
    state: {
        query: '',
        perPage: 10,
        page: 1,
        users: [],
        loading: false
    },
    mutations: {
        SET_RESOURCE(state, users) {
            state.users = users;
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        },
    },
    actions: {
        async fetchResource({ commit }, url) {
            commit('SET_LOADING', true);
            const token = localStorage.getItem('access_token');
            try {
                const response = await fetchData(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const { records } = response
                commit('SET_RESOURCE', records);
            } catch (error) {
                console.warn(error);
            } finally {
                commit('SET_LOADING', false);
            }
        },
    },
}

export default Main;
