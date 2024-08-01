<template>
<img class="logo" src="../../assets/logo.png" alt="Logo" />
<h1>VERIFY OTP</h1>
<div class="verify">
    <form>
        <input v-model="form.otp" type="text" placeholder="Enter OTP" required />
        <button v-on:click="submitForm" :disabled="loading">SEND</button>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VerifyOtpPage',
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
    background-color: #e0530d;
    cursor: not-allowed;
}
</style>
