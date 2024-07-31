<template>
<img class="logo" src="../../assets/logo.png" alt="Logo" />
<h1>REGISTRATION</h1>
<div class="register">
    <form>
        <input v-model="form.name" type="text" placeholder="Enter Name" required />
        <input v-model="form.email" type="email" placeholder="Enter Email" required />
        <input v-model="form.password" type="password" placeholder="Enter Password" required />
        <button v-on:click="submitForm" :disabled="loading">SIGN UP</button>
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
        let data = localStorage.getItem('access_token');
        if (data)
            this.$router.push({
                name: 'Home'
            })
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

            await axios.post('http://127.0.0.1:8000/api/register', {
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
h1 {
    color: #e0530d
}

.logo {
    width: 20%;
}

.register input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #e0530d;
}

.register button {
    width: 320px;
    height: 40px;
    border: 1px solid #e0530d;
    color: white;
    background-color: #e0530d;
    cursor: pointer;
}

.register button:disabled {
    background-color: #e0530d;
    cursor: not-allowed;
}

.button-link {
    display: inline-block;
    width: 320px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid#e0530d;
    color: white;
    background-color: #e0530d;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}
</style>
