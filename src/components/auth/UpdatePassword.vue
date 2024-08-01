<template>
<img class="logo" src="../../assets/logo.png" alt="Logo" />
<h1>UPDATE PASSWORD</h1>
<div class="update">
    <form>
        <input v-model="form.new_password" type="password" placeholder="Enter New Password" required />
        <input v-model="form.new_password_confirmation" type="password" placeholder="Re-enter New Password" required />
        <button v-on:click="submitForm" :disabled="loading">UPDATE</button>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UpdatePasswordPage',
    mounted() {
        let data = localStorage.getItem('access_token');
        if (data)
            this.$router.push({
                name: 'Home'
            })
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
h1 {
    color: #e0530d
}

.logo {
    width: 20%;
}

.update input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #e0530d;
}

.update button {
    width: 320px;
    height: 40px;
    border: 1px solid #e0530d;
    color: white;
    background-color: #e0530d;
    cursor: pointer;
}

.update button:disabled {
    background-color: #e0530d;
    cursor: not-allowed;
}
</style>
