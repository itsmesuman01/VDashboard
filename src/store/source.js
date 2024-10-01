import { fetchData, getCache, clearCache } from "../cacheService.js";

const Main = {
  namespaced: true,
  state: {
    cache: {},
    find: "",
    skip: 0,
    limit: 10,
    loading: false,
    users: [],
    banners: [],
    total: 0,
    isSidebarVisible: true,
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
    SET_TOTAL(state, total) {
      state.total = total;
    },
    SET_USER(state, users) {
      state.users = users;
    },
    SET_BANNER(state, banners) {
      state.banners = banners;
    },
    TOGGLE_SIDEBAR(state) {
      state.isSidebarVisible = !state.isSidebarVisible;
    },
    SET_SKIP(state, skip) {
      state.skip = skip;
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
        const { users, banners, total } = response;
        (total != 0) ? commit("SET_TOTAL", total) : '';
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
