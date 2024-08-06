<template>
<router-view />
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
@import './assets/scss/var';

.flex-scss {
    @include flex-scss
}

#app {
    font-family: Outfit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

.logo {
    width: 20%;
}

body {
    padding: 0;
    margin: 0;
}

h1 {
    color: $globalColor;
}

button {
    width: 160px;
    height: 40px;
    border: 1px solid $globalColor;
    color: white;
    background-color: $globalColor;
    cursor: pointer;
    border-radius: 50px;
}

input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid $globalColor;
}

.button-link {
    display: inline-block;
    width: 160px;
    height: 40px;
    line-height: 38px;
    text-align: center;
    border: 1px solid $globalColor;
    color: white;
    background-color: red;
    text-decoration: none;
    cursor: pointer;
    border-radius: 50px;
}

.button-link :hover {
    background-color: red;
    color: white;
}

.button-link :active {
    background-color: black;
}

.home-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

header {
    background-color: #f8f9fa;
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.main-content {
    display: flex;
    flex: 1;
    background-color: #e9ecef;
}

.sidebar {
    width: 250px;
    background-color: #343a40;
    color: #fff;
    padding: 20px;
}

.content {
    flex: 1;
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
    text-align: left;
}

th,
td {
    padding: 6px;
    border-bottom: 1px solid #ddd;
    border: 1px solid black;
    text-align: center;
}

thead {
    background-color: #f4f4f4;
}

th {
    background-color: $globalColor;
    color: #fff;
}

tr:hover {
    background-color: white;
}
</style>
