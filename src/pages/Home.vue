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
import { Header, Sidebar, Footer } from '../components/layout';
export default {
    name: 'HomePage',
    components: {
        Header,
        Sidebar,
        Footer,
    },
}
</script>
