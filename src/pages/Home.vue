<template>
    <div class="containerapp">
        <Sidebar />
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
    mounted() {
        const token = localStorage.getItem('access_token');

        if (!token) {
            this.$router.push({ name: 'Login' });
            return;
        }
    }
}
</script>
