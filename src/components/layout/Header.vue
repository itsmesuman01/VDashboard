<template>
<div class="header">
    <router-link class="button-link" to="/home">HOME</router-link>
    <a href="#" @click.prevent="logout">LOGOUT</a>
</div>
</template>

<script>
export default {
    name: 'HeaderPage',
    mounted() {
        let data = localStorage.getItem('access_token');
        if (!data) {
            this.$router.push({
                name: 'Login'
            });
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('access_token');
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
    /* Corrected color code */
    text-align: center;
    padding: 10px 14px;
    /* Corrected padding syntax */
    text-decoration: none;
    font-size: 16px;
    margin-right: 4px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
