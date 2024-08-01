<template>
<img class="logo" src="../../assets/logo.png" alt="Logo" />
<h1>UPDATE PASSWORD</h1>
<div class="update">
    <form @submit.prevent="submitForm">
        <input v-model="form.new_password" type="password" placeholder="Enter New Password" required />
        <input v-model="form.new_password_confirmation" type="password" placeholder="Re-enter New Password" required />
        <button type="submit" :disabled="loading">UPDATE</button>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UpdatePasswordPage',
    mounted() {
        this.$mountTo(this.$router);
    },
    data() {
        return {
            form: {
                new_password: '',
                new_password_confirmation: ''
            },
            loading: false,
        };
    },
    methods: {
        async submitForm() {
            if (!this.form.new_password || !this.form.new_password_confirmation) {
                alert('Please fill out all fields.');
                return;
            }

            this.loading = true;

            await axios.post(`${process.env.VUE_APP_API_URL}updatepassword`, {
                    new_password: this.form.new_password,
                    new_password_confirmation: this.form.new_password_confirmation
                })
                .then(response => {
                    alert(response.data.message);
                    this.$router.push({
                        name: 'Login'
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
