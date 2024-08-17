import { fetchData, getCache, clearCache } from "../cacheService.js";

const Main = {
  namespaced: true,
  state: {
    cache: {},
    query: "",
    skip: 0,
    limit: 10,
    loading: false,
    users: [],
    banners: [],
  },
  mutations: {
    CLEAR_CACHE() {
      clearCache();
    },
    GET_CACHE() {
      getCache();
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_USER(state, users) {
      state.users = users;
    },
    SET_BANNER(state, banners) {
      state.banners = banners;
    },
  },
  getters: {
    getCache: (state) => state.cache,
  },
  actions: {
    async fetchResource({ commit }, url) {
      commit("SET_LOADING", true);
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetchData(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { users, banners } = response;
        commit("SET_USER", users);
        commit("SET_BANNER", banners);
      } catch (error) {
        console.warn(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};

export default Main;
