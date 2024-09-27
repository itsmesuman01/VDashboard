<template>
    <div v-show="isSidebarVisible" class="side">
        <h2 class="side-title">Menu</h2>
        <ul class="side-menu">
            <li>
                <router-link to="/">
                    <h3>Home</h3>
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
        ...mapState('main', {
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
.side {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #4b90f1;
    height: 100%;
    width: auto;
    transition: all 0.3s ease;
}

.side-title {
    color: #fff;
    font-size: 24px;
    margin-bottom: 20px;
}

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
    background-color: #575757;
}
</style>