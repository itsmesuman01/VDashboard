<template>
<div class="home-container">
    <Header />
    <div class="main-content">
        <Sidebar />
        <div class="content">
            <h1>Hello, Welcome To Home Page</h1>
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import Header from './layout/Header.vue'
import Sidebar from './layout/Sidebar.vue'
import Footer from './layout/Footer.vue'
export default {
    name: 'HomePage',
    components: {
        Header,
        Sidebar,
        Footer,
    },
}
</script>

<style scoped>
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

footer {
    background-color: yellow;
    padding: 10px;
    text-align: center;
    border-top: 1px solid #ddd;
}
</style>
