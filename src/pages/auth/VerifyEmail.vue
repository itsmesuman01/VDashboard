<template>
<img class="logo" src="../../assets/logo.png" alt="Logo" />
<h1>VERIFY EMAIL</h1>
<div class="verify">
    <form @submit.prevent="submitForm">
        <input v-model="form.email" type="email" placeholder="Enter Email" required />
        <button type="submit" :disabled="loading">SEND</button>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VerifyEmailPage',
    mounted() {
        this.$mountTo(this.$router);
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
