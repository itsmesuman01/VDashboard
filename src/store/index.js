import { createStore } from "vuex";
import Source from "./source.js";
import User from "./user.js";
import Banner from "./banner.js";

export default createStore({
  modules: {
    source: Source,
    user: User,
    banner: Banner,
  },
});
