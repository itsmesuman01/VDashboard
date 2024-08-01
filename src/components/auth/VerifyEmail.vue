<template>
<img class="logo" src="../../assets/logo.png" alt="Logo" />
<h1>VERIFY EMAIL</h1>
<div class="verify">
    <form>
        <input v-model="form.email" type="email" placeholder="Enter Email" required />
        <button v-on:click="submitForm" :disabled="loading">SEND</button>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VerifyEmailPage',
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
            },
            loading: false,
        };
    },
    methods: {
        async submitForm() {
            if (!this.form.email) {
                alert('Please fill out all fields.');
                return;
            }

            this.loading = true;

            await axios.post(`${process.env.VUE_APP_API_URL}verifyemail`, {
                    email: this.form.email,
                })
                .then(response => {
                    alert(response.data.message);
                    this.$router.push({
                        name: 'VerifyOtp'
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

.verify input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #e0530d;
}

.verify button {
    width: 320px;
    height: 40px;
    border: 1px solid #e0530d;
    color: white;
    background-color: #e0530d;
    cursor: pointer;
}

.verify button:disabled {
    background-color: lightgray;
    cursor: not-allowed;
}
</style>
