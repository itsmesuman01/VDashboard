import { createStore } from "vuex";
import { User } from './user.js'

export default createStore({
    modules: {
        user: User,
    }
});
