<template>
<div class="sidebar">
    <h2 class="sidebar-title">Menu</h2>
    <ul class="sidebar-menu">
        <li v-if="hasPermission('role.read')">
            <router-link to="/role">Role</router-link>
        </li>
        <li v-if="hasPermission('user.update')">
            <router-link to="/user">User</router-link>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'SidebarPage',
    data() {
        return {
            permission: [],
            permissionNames: [],
        }
    },
    methods: {
        hasPermission(permissionName) {
            return this.$hasPermission(permissionName);
        }
    }
};
</script>

<style scoped>
.sidebar-menu {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.sidebar-menu li {
    padding: 10px 15px;
}

.sidebar-menu a {
    color: #fff;
    text-decoration: none;
    display: block;
}

.sidebar-menu a:hover {
    background-color: #575757;
}
</style>
