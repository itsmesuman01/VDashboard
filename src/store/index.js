import { createStore } from "vuex";
import { getCache, clearCache } from "../cacheService.js";
import User from "./user.js";
import Banner from "./banner.js";
import Product from "./product.js";

export default createStore({
  modules: {
    user: User,
    banner: Banner,
    product: Product,
  },
  state: {
    cache: {},
    find: "",
    limit: 10,
    isSidebarVisible: true,
  },
  mutations: {
    SET_LIMIT(state, limit) {
      state.limit = limit;
    },
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
});
