import axios from 'axios'
export const User = {
    state: {
        roles: [],
        loading: false,
    },
    mutations: {
        SET_ROLES(state, roles) {
            state.roles = roles;
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        },
    },
    actions: {
        async fetchRoles({ commit }) {
            commit('SET_LOADING', true);
            const token = localStorage.getItem('access_token');
            const apiUrl = `${process.env.VUE_APP_API_URL}auth/role`;
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                commit('SET_ROLES', response.data.records);
            } catch (error) {
                console.warn(error);
            } finally {
                commit('SET_LOADING', false);
            }
        },
    },
    getters: {
        roles: (state) => state.roles,
        loading: (state) => state.loading,
    },
}
