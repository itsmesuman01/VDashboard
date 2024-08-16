import { createStore } from "vuex";
import Main from './source.js'

export default createStore({
    modules: {
        main: Main,
    }
});
