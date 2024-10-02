<template>
    <div class="head flex items-center bg-[#006aff] h-[60px] pl-[1rem]">
        <i v-if="isToggleVisible" @click="toggleSidebar"
            class="fas fa-bars text-blue-900 hover:text-blue-700 transition duration-200 cursor-pointer p-2 rounded-lg hover:bg-blue-100"
            aria-label="Toggle sidebar"></i>
        <div class="ml-auto">
            <router-link to="/home">HOME</router-link>
            <a @click.prevent="logout">LOGOUT</a>
        </div>
    </div>
    <div id="toastbar"></div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'HeaderPage',
    data() {
        return {
            windowWidth: window.innerWidth,
            isToggleVisible: false,
            check: 0
        };
    },
    computed: {
        ...mapState({
            isSidebarVisible: state => state.isSidebarVisible
        }),
    },
    mounted() {
        window.addEventListener('resize', this.updateWindowWidth);
        this.updateToggleVisibility();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateWindowWidth);
    },
    methods: {
        updateWindowWidth() {
            this.windowWidth = window.innerWidth;
            this.updateToggleVisibility();
        },
        updateToggleVisibility() {
            this.isToggleVisible = this.windowWidth < 710;

            if (this.windowWidth >= 710 && this.check === 1) {
                this.check = 0;
                this.toggleSidebar();
            } else if (this.isToggleVisible && this.check === 0) {
                this.check = 1;
                this.toggleSidebar();
            }
        },
        logout() {
            ['access_token', 'permissions'].forEach(key => localStorage.removeItem(key));
            this.$router.push({ name: 'Login' });
        },
        toggleSidebar() {
            this.$store.commit('TOGGLE_SIDEBAR');
        }
    },
    watch: {
        windowWidth: 'updateToggleVisibility',
    },
};
</script>

<style scoped>
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
</style>
