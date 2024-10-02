<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div id="toastbar"></div>
        <div class="bg-white rounded-lg shadow-lg p-8 w-96">
            <img class="mx-auto mb-6" src="../../assets/logo.png" alt="Logo" />
            <h1 class="text-2xl font-semibold text-center mb-6">REGISTRATION</h1>
            <div class="register">
                <form @submit.prevent="submitForm">
                    <input v-model="form.name" type="text" placeholder="Enter Name" required
                        class="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" />
                    <input v-model="form.email" type="email" placeholder="Enter Email" required
                        class="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" />
                    <input v-model="form.password" type="password" placeholder="Enter Password" required
                        class="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" />
                    <button type="submit" :disabled="loading"
                        class="w-full p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">
                        SIGN UP
                    </button>
                    <p class="mt-4 text-center">
                        <router-link class="text-blue-500 hover:underline" to="/">SIGN IN</router-link>
                    </p>
                </form>
            </div>
        </div>
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
            this.loading = true;

            await axios.post(`${process.env.VUE_APP_API_URL}register`, {
                id: 0,
                name: this.form.name,
                email: this.form.email,
                password: this.form.password
            })
                .then(response => {
                    this.$showToast('PASS', response.data.message);
                    setTimeout(() => this.$router.push({ name: 'Login' }), 1500);
                })
                .catch(error => {
                    this.$showToast('FAIL', error.response.data.message.password);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>
