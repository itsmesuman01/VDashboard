<template>
    <div v-show="isSidebarVisible"
        class="flex flex-col p-5 bg-[#4b90f1] h-full w-[15vw] transition-all duration-300 ease-in-out">
        <h2 class="text-[#fff] text-[24px] mb-[20px]">Menu</h2>

        <ul class="side-menu">
            <li>
                <router-link to="/">
                    Home
                </router-link>
            </li>
            <li v-if="hasPermission('role.read')">
                <router-link to="/role">Role</router-link>
            </li>
            <li v-if="hasPermission('user.read')">
                <router-link to="/user">User</router-link>
            </li>
            <li v-if="hasPermission('banner.read')">
                <router-link to="/banner">Banner</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'SidebarPage',
    computed: {
        ...mapState({
            isSidebarVisible: state => state.isSidebarVisible,
        }),
    },
    methods: {
        hasPermission(permissionName) {
            return this.$hasPermission(permissionName);
        }
    }
};
</script>

<style scoped>
.side-menu {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.side-menu li {
    margin: 0;
}

.side-menu a {
    color: #fff;
    text-decoration: none;
    display: block;
    padding: 10px 15px;
    font-size: 18px;
}

.side-menu a:hover {
    background-color: rgb(255, 0, 0);
}

@media screen and (max-width: 710px) {
    .side {
        width: 45vw;
    }
}
</style>
