import { fetchData } from "../cacheService.js";

const Banner = {
  namespaced: true,
  state: {
    skip: 0,
    loading: false,
    banners: [],
    total: 0,
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_SKIP(state, skip) {
      state.skip = skip;
    },
    SET_BANNER(state, banners) {
      state.banners = banners;
    },
    SET_TOTAL(state, total) {
      state.total = total;
    },
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
        const { banners, total } = response;
        total != 0 ? commit("SET_TOTAL", total) : "";
        commit("SET_BANNER", banners);
      } catch (error) {
        console.warn(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};

export default Banner;
