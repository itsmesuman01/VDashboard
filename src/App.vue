<template>
<router-view />
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.logo {
    width: 20%;
}

body {
    padding: 0;
    margin: 0;
}

h1 {
    @include h1;
}

button {
    @include button;
}

input {
    @include input;
}

.button-link {
    @include button-link;
}
</style>
