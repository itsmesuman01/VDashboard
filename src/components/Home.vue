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
