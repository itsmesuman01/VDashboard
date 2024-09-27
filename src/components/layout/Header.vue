<template>
    <div class="head">
        <button v-if="isToggleVisible" @click="toggleSidebar" class="toggle">TOGGLE SIDEBAR</button>
        <div class="space">
            <router-link to="/home">HOME</router-link>
            <a @click.prevent="logout">LOGOUT</a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'HeaderPage',
    data() {
        return {
            isToggleVisible: false
        };
    },
    computed: {
        ...mapState('main', {
            isSidebarVisible: state => state.isSidebarVisible
        }),
    },
    mounted() {
        window.addEventListener('resize', this.updateToggleVisibility);
        this.updateToggleVisibility();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateToggleVisibility);
    },
    methods: {
        updateToggleVisibility() {
            this.isToggleVisible = window.innerWidth < 710;
        },
        logout() {
            ['access_token', 'permissions'].forEach(key => localStorage.removeItem(key));
            this.$router.push({ name: 'Login' });
        },
        toggleSidebar() {
            this.$store.commit('main/TOGGLE_SIDEBAR');
        }
    },
};
</script>

<style scoped>
.head {
    display: flex;
    align-items: center;
    background-color: #006aff;
    height: 60px;
    padding-left: 1rem;
}

.head a,
.head router-link {
    color: #f2f2f2;
    text-align: center;
    padding: 10px 14px;
    text-decoration: none;
    font-size: 16px;
    margin-right: 4px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

.head .space {
    margin-left: auto;
}
</style>