<template>
<img class="logo" src="../../assets/logo.png" alt="Logo" />
<h1>REGISTRATION</h1>
<div class="register">
    <form @submit.prevent="submitForm">
        <input v-model="form.name" type="text" placeholder="Enter Name" required />
        <input v-model="form.email" type="email" placeholder="Enter Email" required />
        <input v-model="form.password" type="password" placeholder="Enter Password" required />
        <button type="submit" :disabled="loading">SIGN UP</button>
        <p>
            <router-link class="button-link" to="/">SIGN IN</router-link>
        </p>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RegisterPage',
    mounted() {
        this.$mountTo(this.$router);
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: ''
            },
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

            await axios.post(`${process.env.VUE_APP_API_URL}register`, {
                    id: 0,
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password
                })
                .then(response => {
                    alert(response.data.message);
                    this.$router.push({
                        name: 'Login'
                    })
                })
                .catch(error => {
                    console.warn(error)
                    alert(error.response.data.errors.password);
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
