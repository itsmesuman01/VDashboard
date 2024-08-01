<template>
<img class="logo" src="../../assets/logo.png" alt="Logo" />
<h1>LOGIN</h1>
<div class="login">
    <form @submit.prevent="submitForm">
        <input v-model="form.email" type="email" placeholder="Enter Email" required />
        <input v-model="form.password" type="password" placeholder="Enter Password" required />
        <button type="submit" :disabled="loading">LOGIN</button>
        <p>
            <router-link class="button-link" to="/register">REGISTRATION</router-link>
        </p>
        <p>
            <router-link class="button-link" to="/verifyemail">FORGET PASSWORD</router-link>
        </p>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginPage',
    mounted() {
        this.$mountTo(this.$router);
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            loading: false,
        };
    },
    methods: {
        async submitForm() {
            if (!this.form.email || !this.form.password) {
                alert('Please fill out all fields.');
                return;
            }

            this.loading = true;

            await axios.post(`${process.env.VUE_APP_API_URL}login`, {
                    email: this.form.email,
                    password: this.form.password
                })
                .then(response => {
                    const access_token = response.data.access_token;
                    localStorage.setItem('access_token', JSON.stringify(access_token));
                    alert(response.data.message);
                    this.$router.push({
                        name: 'Home'
                    })
                })
                .catch(error => {
                    console.warn(error)
                    alert(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>

<style scoped>
</style>
