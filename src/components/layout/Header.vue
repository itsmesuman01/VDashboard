<template>
<div class="header">
    <div class="space">
        <router-link to="/home">HOME</router-link>
        <a @click.prevent="logout">LOGOUT</a>
    </div>
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

<style lang="scss" scoped>
.header {
    @include flex-scss;
    background-color: black;
    height: 60px;
    border-bottom: 5px solid white;
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
    font-size: large;
}

.header .space {
    margin-left: 290px;
}
</style>
