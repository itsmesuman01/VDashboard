import { getCache, clearCache } from "../cacheService.js";

const Source = {
  namespaced: true,
  state: {
    cache: {},
    find: "",
    limit: 10,
    isSidebarVisible: true,
  },
  mutations: {
    CLEAR_CACHE() {
      clearCache();
    },
    GET_CACHE() {
      getCache();
    },
    TOGGLE_SIDEBAR(state) {
      state.isSidebarVisible = !state.isSidebarVisible;
    },
  },
  getters: {
    getCache: (state) => state.cache,
  },
};

export default Source;
