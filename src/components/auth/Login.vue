<template>
<img class="logo" src="../../assets/logo.png" alt="Logo" />
<h1>LOGIN</h1>
<div class="login">
    <form>
        <input v-model="form.email" type="email" placeholder="Enter Email" required />
        <input v-model="form.password" type="password" placeholder="Enter Password" required />
        <button v-on:click="submitForm" :disabled="loading">LOGIN</button>
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
        let data = localStorage.getItem('access_token');
        if (data)
            this.$router.push({
                name: 'Home'
            })
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
h1 {
    color: #e0530d
}

.logo {
    width: 20%;
}

.login input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #e0530d;
}

.login button {
    width: 320px;
    height: 40px;
    border: 1px solid #e0530d;
    color: white;
    background-color: #e0530d;
    cursor: pointer;
}

.login button:disabled {
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

/* .button-link:hover {
    background-color: #e0530d;
    color: white;
}

.button-link:active {
    background-color: navy;
} */
</style>
