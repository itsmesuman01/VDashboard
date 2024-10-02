<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div id="toastbar"></div>
        <div class="bg-white rounded-lg shadow-lg p-8 w-96">
            <img class="mx-auto mb-6" src="../../assets/logo.png" alt="Logo" />
            <h1 class="text-2xl font-semibold text-center mb-6">VERIFY OTP</h1>
            <div class="verify">
                <form @submit.prevent="submitForm">
                    <input v-model="form.otp" type="text" placeholder="Enter OTP" required
                        class="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" />
                    <button type="submit" :disabled="loading"
                        class="w-full p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">
                        SEND
                    </button>
                </form>
            </div>
        </div>
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
            this.loading = true;

            await axios.post(`${process.env.VUE_APP_API_URL}verifyotp`, {
                otp: this.form.otp,
            })
                .then(response => {
                    this.$showToast('PASS', response.data.message);
                    setTimeout(() => this.$router.push({ name: 'UpdatePassword' }), 1500);
                })
                .catch(error => {
                    this.$showToast('FAIL', error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>
