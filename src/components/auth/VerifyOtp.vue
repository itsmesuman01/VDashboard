<template>
<img class="logo" src="../../assets/logo.png" alt="Logo" />
<h1>VERIFY OTP</h1>
<div class="verify">
    <form @submit.prevent="submitForm">
        <input v-model="form.otp" type="text" placeholder="Enter OTP" required />
        <button type="submit" :disabled="loading">SEND</button>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VerifyOtpPage',
    mounted() {
        this.$mountTo(this.$router);
    },
    data() {
        return {
            form: {
                otp: '',
            },
            loading: false,
        };
    },
    methods: {
        async submitForm() {
            if (!this.form.otp) {
                alert('Please fill out all fields.');
                return;
            }

            this.loading = true;

            await axios.post(`${process.env.VUE_APP_API_URL}verifyotp`, {
                    otp: this.form.otp,
                })
                .then(response => {
                    alert(response.data.message);
                    this.$router.push({
                        name: 'UpdatePassword'
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
