<template>
<div class="header">
    <router-link class="button-link" to="/home">HOME</router-link>
    <a @click.prevent="logout">LOGOUT</a>
</div>
</template>

<script>
export default {
    name: 'HeaderPage',
    methods: {
        logout() {
            ['access_token', 'permissions'].forEach(key => localStorage.removeItem(key));
            this.$router.push({
                name: 'Login'
            });
        }
    }
}
</script>

<style scoped>
.header {
    background-color: #333;
    overflow: hidden;
}

.header a,
.header router-link {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 10px 14px;
    text-decoration: none;
    font-size: 16px;
    margin-right: 4px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
