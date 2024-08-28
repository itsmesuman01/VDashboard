<template>
<div class="head">
    <button @click="toggleSidebar" class="toggle">TOGGLE SIDEBAR</button>
    <div class="space">
        <router-link to="/home">HOME</router-link>
        <a @click.prevent="logout">LOGOUT</a>
    </div>
</div>
</template>

<script>
export default {
    name: 'HeaderPage',
    data() {
        return {
            isSidebarVisible: false
        }
    },
    methods: {
        logout() {
            ['access_token', 'permissions'].forEach(key => localStorage.removeItem(key));
            this.$router.push({ name: 'Login' });
        },
        toggleSidebar() {
            this.$emit('hideSidebar');
        }
    }
}
</script>

<style scoped>
.head {
    display: flex;
    align-items: center;
    background-color: #ff7000;
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

@media (min-width: 710px) {
    .toggle {
        display: none;
    }
}
</style>
