import { fetchData } from "../cacheService.js";

const User = {
  namespaced: true,
  state: {
    skip: 0,
    loading: false,
    users: [],
    total: 0,
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_SKIP(state, skip) {
      state.skip = skip;
    },
    SET_USER(state, users) {
      state.users = users;
    },
    SET_TOTAL(state, total) {
      state.total = total;
    },
  },
  actions: {
    async fetchResource({ state, commit }, url) {
      commit("SET_LOADING", true);
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetchData(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { users, total } = response;
        if (state.skip == 0) commit("SET_TOTAL", total);
        commit("SET_USER", users);
      } catch (error) {
        console.warn(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};

export default User;
