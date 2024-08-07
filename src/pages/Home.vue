<template>
<div class="container">
    <div class="sidebar">
        <Sidebar />
    </div>
    <div class="maincontent">
        <div class="header">
            <Header />
        </div>
        <div class="section">
            <h1>Hello, Welcome To Home Page</h1>
        </div>
        <div class="footer">
            <Footer />
        </div>
    </div>
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
