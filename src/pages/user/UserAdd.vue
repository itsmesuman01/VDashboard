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
            <h1>{{(this.$route.params.id == 0) ? 'CREATE' : 'UPDATE'}} USER</h1>
            <div class="register">
                <form @submit.prevent="submitForm">
                    <input v-model="form.name" type="text" placeholder="Enter Name" required />
                    <input v-model="form.email" type="email" placeholder="Enter Email" required />
                    <input v-model="form.password" type="password" placeholder="Enter Password" required />
                    <select class="dropdown" v-model="form.selectedRole" required>
                        <option disabled value="">Select Role</option>
                        <option v-for="item in roles" :key="item.id" :value="item.id">
                            {{ item.name }}
                        </option>
                    </select>
                    <br><br>

                    <button type="submit" :disabled="loading">{{(this.$route.params.id == 0) ? 'CREATE' : 'UPDATE'}}</button>
                </form>
            </div>
        </div>
        <div class="footer">
            <Footer />
        </div>
    </div>
</div>
</template>

<script>
import { Header, Sidebar, Footer } from '../../components/layout';
import axios from 'axios'
import { fetchData } from '../../cacheService'

export default {
    name: 'UserAddPage',
    components: {
        Header,
        Sidebar,
        Footer,
    },
    async mounted() {
        const token = localStorage.getItem('access_token');

        if (!token) {
            this.$router.push({ name: 'Login' });
            return;
        }

        const apiUrl = `${process.env.VUE_APP_API_URL}auth/role`;

        try {
            const response = await fetchData(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { records } = response;
            this.roles = records;
        } catch (error) {
            console.warn(error);
        } finally {
            this.loading = false;
        }
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                selectedRole: ''
            },
            roles: [],
            loading: false,
        };
    },
    methods: {
        async submitForm() {
            if (!this.form.name || !this.form.email || !this.form.password) {
                alert('Please fill out all fields.');
                return;
            }

            this.loading = true;

            const token = localStorage.getItem('access_token');

            await axios.post(`${process.env.VUE_APP_API_URL}auth/user`, {

                    id: (this.$route.params.id == 0) ? 0 : parseInt(this.$route.params.id),
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password,
                    role_id: this.form.selectedRole
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }, )
                .then(response => {
                    alert(response.data.message);
                    this.$router.push({
                        name: 'User'
                    })
                })
                .catch(error => {
                    console.warn(error);
                    alert(error.response?.data?.errors?.password || 'An error occurred');
                })

                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>

<style scoped>
h1 {
    color: tomato;
    margin: 50px 0px 50px 0px;
}
</style>
